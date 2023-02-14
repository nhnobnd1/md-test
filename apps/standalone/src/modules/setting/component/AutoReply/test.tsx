import Model from "@ckeditor/ckeditor5-react";
import Plugin from "@ckeditor5-core/src/plugin";

import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor5-utils/src/collection";

import imageIcon from "@ckeditor5-core/theme/icons/image.svg";

export default class ImageDropdown extends Plugin {
  static get pluginName() {
    return "ImageDropdown";
  }

  init() {
    const editor = this.editor;
    const t = editor.t;
    const defaultTitle = t("Add image");
    const dropdownTooltip = t("Image");

    // Register UI component
    editor.ui.componentFactory.add("imageDropdown", (locale) => {
      const dropdownView = createDropdown(locale);

      dropdownView.set({
        label: "Image",
        tooltip: true,
      });
      dropdownView.buttonView.set({
        isOn: false,
        withText: true,
        tooltip: dropdownTooltip,
      });
      dropdownView.extendTemplate({
        attributes: {
          class: ["ck-image-dropdown"],
        },
      });

      // The collection of the list items.
      const items = new Collection();

      items.add({
        type: "button",
        model: new Model({
          label: "Uppload image",
          icon: imageIcon,
        }),
      });

      items.add({
        type: "button",
        model: new Model({
          label: "Image URL",
          icon: imageIcon,
        }),
      });

      // Create a dropdown with a list inside the panel.
      addListToDropdown(dropdownView, items);

      return dropdownView;
    });
  }
}
