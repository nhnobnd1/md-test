import { Module, useRoutes, useToggle } from "@moose-desk/core";
import { camelCase } from "lodash-es";
import { memo, ReactElement, useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { i18n } from "src/localization";
import RoutePaths from "src/routes/paths";

interface ModuleLoaderProps {
  children: ReactElement;
}

const viteModules = import.meta.glob(`/src/modules/**/module.{tsx,ts}`);

const ModuleLoader = ({ children }: ModuleLoaderProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const { on: startLoading, off: stopLoading } = useToggle();
  const { state: firstLoad, on: loaded } = useToggle();
  const { addRoutes, removeRoute } = useRoutes();

  useEffect(() => {
    startLoading();

    async function loadModule() {
      const loadedModules: any[] = await Promise.all(
        Object.values(viteModules).map((module) => module())
      );

      for (const module of loadedModules) {
        const moduleInstance = module.default as Module;

        Object.assign(RoutePaths, {
          [moduleInstance.name]: moduleInstance.route.paths,
        });
      }

      for (const module of loadedModules) {
        const moduleInstance = module.default as Module;

        addRoutes(moduleInstance.route.item);

        if (moduleInstance.locales) {
          for (const lang in moduleInstance.locales) {
            if (
              Object.prototype.hasOwnProperty.call(moduleInstance.locales, lang)
            ) {
              const resources = moduleInstance.locales[lang];

              i18n.addResources(
                lang,
                camelCase(moduleInstance.name),
                resources
              );
            }
          }
        }
      }

      setTimeout(() => {
        unstable_batchedUpdates(() => {
          setModules(loadedModules.map((module) => module.default as Module));
          stopLoading();
          loaded();
        });
      }, 500);
    }

    loadModule();
  }, [viteModules]);

  useEffect(() => {
    return () => {
      for (const moduleInstance of modules) {
        removeRoute(moduleInstance.route.item.path);

        if (moduleInstance.locales) {
          for (const lang in moduleInstance.locales) {
            i18n.removeResourceBundle(lang, camelCase(moduleInstance.name));
          }
        }
      }
    };
  }, [viteModules]);

  return <>{firstLoad && children}</>;
};

export default memo(ModuleLoader);
