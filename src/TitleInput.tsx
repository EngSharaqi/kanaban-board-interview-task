import React from 'react';
import { StyledInput } from './Form.styles';

type TitleInputProps = {
  onSubmit: Function;
  placeholder?: string;
};

export const TitleInput = (props: TitleInputProps) => {
  const { onSubmit, placeholder = 'New Item' } = props;

  const [title, setTitle] = React.useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();

  };

  const addNew = () => {
    if (!title) return;
    onSubmit(title);
    setTitle('');
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', margin: '0.1rem' }}
      >
        <StyledInput
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={placeholder}
        />
      </form>
      <button style={{ "marginTop": ".5rem", "width": "100%", "padding": "10px 7px", "backgroundColor": "Green", "color": "#fff", "border" : "1px solid green", "borderRadius": "10px", "cursor": "pointer"}} onClick={addNew}>Add New</button>
    </>
  );
};
