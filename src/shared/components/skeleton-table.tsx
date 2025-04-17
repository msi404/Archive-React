import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Container } from '@/shared/components/container';
import { For } from '@/shared/components/utils/for';

export const SkeletonTable = () => {
  const arrayHeader = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

  const arrayBody = [
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' }
  ];
  return (
    <Container>
      <Card className="p-4 shadow border rounded-none">
        <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="flex flex-col w-full lg:flex-row gap-5">
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
        <Container>
          <div>
            <div>
              <div className='flex justify-between'>
                <For each={arrayHeader}>
                  {(item) => (
                    <div key={item.id}>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  )}
                </For>
              </div>
            </div>
            <div>
              <For each={arrayBody}>
                {(item) => (
                  <div className='flex justify-between items-center gap-4' key={item.id}>
                    <For each={arrayHeader}>
                      {(item) => (
                        <div className='my-2' key={item.id}>
                          <Skeleton className="h-5 w-20" />
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
          <Skeleton className="w-full h-8 mt-12" />
        </Container>
      </Card>
    </Container>
  );
};