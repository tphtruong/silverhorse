import React from 'react';
import App from './App';
import DisplayComponent from './components/DisplayComponent';
import { Item } from "./entities/CommonTypes";
// the component to test
import { apiGet } from './common/apiHelper';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer';
import { render } from '@testing-library/react'

test('should show "welcome to my test page"', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to my test page/i);
  expect(linkElement).toBeInTheDocument();
});

it('should find "DisplayComponent" by className', ()=>{
  const func = ()=>{}
  const items:Item[] = [{name:'name',userId:1}]
  const renderer = ShallowRenderer.create(
    <DisplayComponent 
      items={items} 
      edited={null}
      onCancel={func}
      onDelete={func}
      onUpdate={func}
      onEdit={func}
    />
  );
  const testInstance = renderer.root;
  expect(testInstance.findByProps({className: "post-container"})).toBeTruthy();
})
