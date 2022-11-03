---
title: Call Api In Component
---

# {{$frontmatter.title}}

- Import `useJob` from `src/core/hooks`.
- Parameters of `useJob` is a function that return an Observable.
- `useJob` return an object with the following properties:
  - **run**: Function to call api
  - **cancel**: Function to cancel call api
  - **state**: Api calling state
  - **processing**: _true_ nếu api is calling, _false_ in the way around.
  - **result**: Api's response.
  - **error**: Error when api calling is failed.

Example:

```tsx
import { Space } from "antd";
import { map } from "rxjs";
import { Button, Card } from "src/components";
import PostRepository from "src/repositories/PostRepository";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";

const IndexPage = () => {
  const { run, cancel, processing } = useJob(() => {
    return new PostRepository.getList().pipe(
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

### Type Declarations

```ts
enum JobState {
  Standing = "standing",
  Processing = "processing",
  Success = "success",
  Failed = "Failed",
}

type Fn<Result = any> = (...args: any) => Observable<Result>;
interface UseJobOptions {
  showLoading?: boolean;
}

interface UseJobResult<T extends Fn> {
  run: (...args: Parameters<T>) => void;
  cancel: () => void;
  state: JobState;
  processing: boolean;
  result?: ReturnType<T> extends Observable<infer R> ? R : any;
  error: any;
}

export function useJob<T extends Fn>(
  fn: T,
  options?: UseJobOptions
): UseJobResult<T>;
```
