import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Column } from './Column';
import React, { Suspense, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { globalStyles } from './stitches.config';
import { TitleInput } from './TitleInput';
import { StyledColumn } from './Column.styles';

export type ItemsType = {
  id: string;
  title: string;
  column: number | string | null;
  active?: boolean
};

export type ColumnsType = {
  id: number | string | null;
  title: string;
};

function App() {
  globalStyles();

  const [columns, setColumns] = React.useState<ColumnsType[]>([]);
  const [items, setItems] = React.useState<ItemsType[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const onColumnChange = (id: string, columnId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          item.column = columnId;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    setIsLoading(true);

    interface Post {
      userId: number;
      id: number;
      title: string;
      body: string;
    }

    async function fetchPosts(): Promise<Post[]> {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;
    }

    async function main() {
      try {
        const posts = await fetchPosts();
        const transformedPosts: ItemsType[] = posts.map(post => ({
          id: post.id.toString(),
          title: post.title,
          column: null,
        }));
        setItems(transformedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);

      }
    }
    main();
  }, [])

  // const addNewItem = (title: string, columnId: number | null) => {
  //   const activeItemIndex = items.findIndex(item => item.column === columnId && item.active === true);
  //   const newItem = { id: uuid(), title, column: columnId };
  
  //   if (activeItemIndex !== -1) {
  //     // If there's an active item, insert the new item after it
  //     const updatedItems = [...items.slice(0, activeItemIndex + 1), newItem, ...items.slice(activeItemIndex + 1)];
  //     setItems(updatedItems);
  //   } else {
  //     // If no active item exists, append the new item to the end
  //     setItems([...items, newItem]);
  //   }
  // };
  
  return (
    <Suspense fallback={<p style={{ "fontSize": "1.5rem", "display": "flex", "width": "100%", "height": "100vh", "justifyContent": "center", "alignItems": "center" }}>Please wait, we setting up your Kanaban board...</p>}>
      {
        isLoading == true ?
          <p style={{ "fontSize": "1.5rem", "display": "flex", "width": "100%", "height": "100vh", "justifyContent": "center", "alignItems": "center" }}>Please wait, we setting up your Kanaban board...</p>
          :
          <DndProvider backend={HTML5Backend}>
            <div className="App">
              <main
                style={{
                  display: 'flex',
                }}
              >
                <Column
                  onColumnChange={onColumnChange}
                  items={items.filter((item) => item.column === null)}
                  title={'No Assignment'}
                  id={null}
                  onNewItem={(title: string) => {
                    // setItems([...items, { id: uuid(), title, column: null }]);
                    const activeItemIndex = items.findIndex(item => item.active == true);
                    const newItem: ItemsType = { id: uuid(), title, column: null };
                    
                    if (activeItemIndex !== -1) {
                      // If there's an active item, insert the new item after it
                      const updatedItems = [...items.slice(0, activeItemIndex + 1), newItem, ...items.slice(activeItemIndex + 1)];
                      setItems(updatedItems);
                    } else {
                      // If no active item exists, append the new item to the end
                      setItems([...items, newItem]);
                    }
                  }
                }
                ></Column>


                {columns.map((column) => {
                  return (
                    <Column
                      key={column.id}
                      onColumnChange={onColumnChange}
                      items={items.filter((item) => item.column === column.id)}
                      title={column.title}
                      id={column.id}
                      onNewItem={(title: string) => {
                        setItems([
                          ...items,
                          { id: uuid(), title, column: column.id },
                        ]);
                      }}
                    ></Column>
                  );
                })}
                <div className="input">
                  <StyledColumn>
                    <TitleInput
                      placeholder="New Column"
                      onSubmit={(title: string) =>
                        setColumns([...columns, { id: uuid(), title }])
                      }
                    />
                  </StyledColumn>
                </div>
              </main>
            </div>
          </DndProvider>
      }
    </Suspense>
  );
}

export default App;
