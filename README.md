# Hướng dẫn sử dụng app:

- Package:
  - Là nơi chứa code logic chung cho cả 2 app shopify và standalone
  - Khi update code mới trong package xong thì bắt buộc phải yarn build. Đối với standalone muốn cập nhật thư viện trong package bắt buộc phải xóa node_module đi yarn lại
    - Chạy file script "run-me-after-update-package.sh" để làm việc trên. Gõ các lệnh dưới, và chờ chạy xong.
    ```
    $ chmod +x run-me-after-update-package.sh
    $ ./run-me-after-update-package.sh
    ```
  - core: logic core
  - repo: các Repository Api

# Turborepo starter

This is an official Yarn v1 starter turborepo.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Front end

# Reactjs Core

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` (Unavailable)

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Build production environment:

- production: `yarn build`
- staging: `yarn build:staging`
- development: `yarn build:development`

### `yarn gen-module`

Sử dụng để generate module, module được sinh ra trong thư mục `src/modules/<module-name>`. Ví dụ:

```sh
yarn gen-module <module-name>
```

## I. Config VsCode Editor

Cài đặt thêm các extension dưới để follow các convension cơ bản phía trên:

- ESlint (dbaeumer.vscode-eslint)
- EditorConfig for VS Code (editorconfig.editorconfig)
- Prettier - Code formatter (esbenp.prettier-vscode)

Các setting cần thiết cho VsCode đã được thêm vào project, không tùy chỉnh lại.

## II. Convention

### 1. Indent

- Kiểu: space
- Size: 2

### 2. Đặt tên

- Đặt tên **biến** theo định dạng **camelCase**
- Đặt tên **hàm** theo định dạng **camelCase**
- Đặt tên **class** theo định dạng **PascalCase**

### 3. Khai báo component

- Đặt tên **component** theo định dạng **PascalCase**
- Nên dùng **FunctionComponent** nếu có thể
- **Mỗi file một component**, tên file giống tên component
- Nếu là một component bao gồm nhiều thành phần, cần khai báo thành một thư mục theo các yêu cầu dưới:
  - Tên thư mục giống tên component
  - Component gốc đặt trong file `index.tsx`

### 4. Assets/resources

- Các asset/resource cần được thêm vào thư mục `src/assets`
- Các asset cùng loại cần được thêm vào cùng một thư mục con bên trong `src/assets`
- Không require trực tiếp asset/resource
- Các asset/resource được sử dụng trong project cần được khai báo constant trong file `src/assets/index.ts`

### 5. JSX

- Props

  - Nếu một thẻ có nhiều props hoặc prop quá dài, cần phân prop xuống thành nhiều dòng. VD:

  ```jsx
  <Field
    component={CheckboxGroupField}
    options={[
      {
        value: "1",
        label: "ABC",
      },
      {
        value: "aabc",
        label: "ABCD",
      },
      {
        value: "abec",
        label: "ABC 1",
      },
    ]}
    name="abc"
    type="group"
    circle
  />
  ```

- Children
  - Nếu không có thẻ con bên trong cần sử dung selft closing tag. VD: `<Image />`
  - Các thẻ con bên trong cần được thêm 1 indent so với thẻ cha. VD:
  ```jsx
  <View>
    <Text>just a text</Text>
  </View>
  ```

## II. Call API với hook useJob (Recommended)

- Import `useJob` từ `src/core/hooks`
- Tham số đầu vào của `useJob` là một function trả về Observable
- Trả về một object gồm các thuộc tính:
  - **run**: Function để call api
  - **cancel**: Function để huỷ call api
  - **state**: Trạng thái call api
  - **processing**: _true_ nếu api đang được call, _false_ nếu api không được call
  - **result**: Kết quả trả về từ api
  - **error**: Lỗi khi call api thất bại
- Ví dụ:

```ts
import { Space } from "antd";
import { map } from "rxjs";
import { Button, Card } from "src/components";
import { Api } from "src/core/api";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";

const IndexPage = () => {
  const { run, cancel, processing } = useJob(() => {
    return new Api()
      .get<string>("https://jsonplaceholder.typicode.com/todos")
      .pipe(
        map((response) => {
          return response;
        })
      );
  });

  return (
    <Card title="Authors Earnings">
      <Space>
        <Button onClick={run}>Test</Button>
        <Button onClick={cancel}>Cancel</Button>
        {processing ? "Processing" : "Processed"}
      </Space>
    </Card>
  );
};

export default IndexPage;
```

## VII. Call API với Redux

### 1. Middleware

- Tìm hiểu về Rxjs nếu chưa từng sử dụng. Doc: https://www.learnrxjs.io/
- Sử dụng Redux Observable. Doc: https://redux-observable.js.org

### 2. Khai báo module

- Khai báo các module trong cùng 1 thư mục nằm trong `src/redux/modules`, bao gồm cả **action**, **reducer** và **epic**.

### 3. Khai báo module để call api

- Khai báo module trong `src/redux/modules`.
- Có thể sử dụng hàm `createReduxObservableModule` để tạo redux module nhanh sử dung redux-observable.
  - Hàm `createReduxObservable` nhận **ba tham số**:
    - Tham số thứ nhất là 1 object với key là tên epic, giá trị là hàm epic
    - Tham số thứ hai là string, tên của module
    - Tham số thứ ba là default state
  - Trả về một object với các thuộc tính:
    - **actionTypes**: List các action tương ứng với tên epic đã khai báo ở đầu vào, mỗi epic sẽ gồm các action: start, success, failed, cancelled, done.
    - **actions**: List các action creator tương ứng với tên epic đã khai báo, tương tự actionTypes.
    - **epics**: Một mảng các epic đã khai báo.
    - **reducer**: Reducer cho module.
    - **reducerStates**: List các trạng thái của các epic: standing, processing, success, failed.
- VD:

```ts
// src/redux/modules/employee/index.ts
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap, takeUntil } from "rxjs/operators";
import { Action } from "src/core/models/redux";
import {
  createReduxObservableModule,
  ReduxObservableModuleEpicProps,
} from "src/core/redux/ReduxObservableModule";
import { Employee, ListEmployeeRequest } from "src/shared/models/Employee";
import { employeeRepository } from "src/shared/repositories/EmployeeRepository";

const employeeModule = createReduxObservableModule(
  {
    fetchList: ({
      action$,
      actionTypes,
      actions,
    }: ReduxObservableModuleEpicProps<Action<ListEmployeeRequest>>) =>
      action$.pipe(
        ofType(actionTypes.start),
        mergeMap((action) => {
          if (action.payload) {
            return employeeRepository.get(action.payload).pipe(
              map((response) => actions.success(response.data)),
              catchError((error) => of(actions.failed(error))),
              takeUntil(action$.pipe(ofType(actionTypes.cancelled)))
            );
          }
          return of(actions.failed());
        })
      ),
  },
  "employee"
);
export default employeeModule;
```

- Ở ví dụ trên, emplyeeModule sẽ là một object như sau:

```ts
{
  actionTypes: {
    fetchList: {
      start: string,
      success: string,
      failed: string,
      cancelled: string,
      done: string
    }
  },
  actions: {
    fetchList: {
      start: Function;
      success: Function;
      failed: Function;
      cancelled:Function;
      done: Function
    }
  },
  epics: Array<Function>,
  reducer: Function,
  reducerStates: {
    fetchList: {
      standing: string;
      processing: string;
      success: string;
      failed: string;
    }
  }
}
```

### 4. Connect với component

#### a. Connect sử dụng `useReduxObservableModuleAction` (Recommended)

Có thể sử dụng hook `useReduxObservableModuleAction` để connect với module được tạo bởi `createReduxObservableModule`.

#### b. Connect sử dụng HOC `connect` của redux

- Connect với component như bình thường, sử dụng các thuộc tính trong module nhận được từ hàm `createReduxObservableModule`.
- Ví dụ:

```tsx
// ...import
interface EmployeeManagementProps {
  employeeReducer: ReduxObservableModuleReducer;
  fetchListEmployee: (payload: ListEmployeeRequest) => void;
}

const mapStateToProps = (state: RootReducer) => ({
  employeeReducer: state.employee as ReduxObservableModuleReducer,
});

const mapDispatchToProps = {
  fetchListEmployee: employeeModule.actions.fetchList.start,
};

const EmployeeManagement = ({
  employeeReducer,
  fetchListEmployee: startFetchListEmployee,
}: EmployeeManagementProps) => {
  const { t } = useTranslation();
  const { query, setQueryParam } = useQuery();
  const { startProgress, progressSuccess, progressFail } = useProgressMessage();
  // States
  const [listEmployee, setListEmployee] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: query.page_size || env.DEFAULT_PAGE_SIZE,
    current: parseInt(
      (Array.isArray(query.page) ? query.page[0] : query.page) || "1"
    ),
    showSizeChanger: true,
    size: "default",
    showTotal: (total, range) =>
      t(Localizations.General.TotalRecord, {
        start: range[0],
        end: range[1],
        total: total,
      }),
  });
  // Search filter
  const searchText = useMemo(() => {
    return (Array.isArray(query.search) ? query.search[0] : query.search) || "";
  }, [query]);
  const searchDebounced = useDebounced((value: string) => {
    setQueryParam("search", value);
  }, 500);

  const handleInputSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchDebounced.clear();
      const target = e.target as HTMLInputElement;
      if (target.value !== query.search) {
        searchDebounced.start(target.value);
      }
    },
    [query.search]
  );

  // Query employees
  const fetchListEmployee = useCallback(() => {
    startFetchListEmployee({
      search: searchText,
      results_per_page: pagination.pageSize || env.DEFAULT_PAGE_SIZE,
      tenant_id: "123456",
      page: pagination.current || 1,
    });
  }, [searchText, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchListEmployee();
  }, [fetchListEmployee]);

  // loading
  const loading = useMemo(() => {
    return (
      employeeReducer.state ===
      employeeModule.reducerStates.fetchList.processing
    );
  }, [employeeReducer.state]);

  // Handle reducer state
  useDidUpdate(() => {
    let response: ListEmployeeResponse;
    switch (employeeReducer.state) {
      case employeeModule.reducerStates.fetchList.success:
        response = employeeReducer.data as ListEmployeeResponse;
        setListEmployee(response.data);
        setPagination({
          ...pagination,
          total: response.num_results,
        });
        break;
      case employeeModule.reducerStates.fetchList.failed:
        progressFail("Fetch list employee failed");
        break;
    }
  }, [employeeReducer.state]);

  return <></>;
};
```
