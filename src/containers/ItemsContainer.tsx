import React from 'react';
import DisplayComponent from '../components/DisplayComponent';
import { Item, User, Post } from "../entities/CommonTypes";
import _ from 'lodash';
import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function loadJson(url:string) {
  return fetch(baseUrl + url)
    .then(response => response.json());
}

type customState = {
  items: any | null;
  posts: any | null;
  edited: Item | null;
  isLoading: boolean;
};

class ItemsContainer extends React.Component<{}, customState> {
  constructor(props:any) {
    super(props);

    this.state = {
      items:[],
      posts:[],
      edited: null,
      isLoading: false,
    };
  }

  handleEdit = (item:Item, value: string) => {
    if(this.state.edited && this.state.edited.postId === item.postId){
      this.setState({
        edited: {...this.state.edited, postTitle: value}
      })
    } else {
      this.setState({
        edited: item
      })
    }
  }

  handleUpdate  = (item:Item) => {
    var _items = this.state.posts ? [...this.state.posts] : [];
    let foundIdx = _items.findIndex(i => i.postId === item.postId);
    if(foundIdx >= 0 ){
      _items[foundIdx] = item;
      this.setState({
        posts: _items
      })
      toast.success(`{item ${item.name} updated successful.}`);
    }
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({
      edited: null
    })
  }

  handleDelete = (item:Item) => {
    if (window.confirm("Are you sure you want to delete item " + item.name)) {
      const _items = this.state.posts.filter((el:Item) => el.postId !== item.postId);
      this.setState({
        posts: _items
      })
      toast.success(`{item ${item.name} deleted successful.}`);
      this.handleCancel();
    }     
  }

  componentDidMount() {
    this.setState({isLoading: true})
    //load users
    loadJson('/users')
    .then(users => {
      let listOfItems:any = [];
      listOfItems = [...listOfItems,{users:users}];
      // pick any 5 users from users list
      const randomUsersList = _.sampleSize(users, 5).map((el:User) => el);
  
      //load posts
      loadJson('/posts')
      .then(posts => {
        listOfItems = [...listOfItems,{posts:posts}];

        // get posts which contain users from random user list
        const tempPosts = posts.filter((el:
          { userId: number, title: string, id: number }
        ) => {
          return randomUsersList.filter(u => u.id === el.userId).length>0 
            ? {userId:el.userId, postTitle: el.title, postId: el.id} 
            : null
        })
        // then pick 30 random items from tempPosts list above
        const randomPostsPick = _.sampleSize(tempPosts, 30).map((el: {title:string, id:number, userId: number}) => {
          return {userId: el.userId, postTitle: el.title, postId: el.id};
        });
        // append user name to posts collection
        const _posts = randomPostsPick.map(post => {
          const _temp = {...post, name: randomUsersList.filter(u => post.userId === u.id ? u.name : null)[0].name}
          return _temp //.filter(el => el !== null)[0]
        })

        //albumns
        // loadJson('/albums')
        // .then(albums => {
        //   listOfItems = [...listOfItems,{albums:albums}];

          // update state
          this.setState({
            items: listOfItems,
            posts: _posts,
            isLoading: false,
          })
          
        // })         
      })
    })
  }

  render() {
    const { posts, edited, isLoading } = this.state;

    return (<>
      {isLoading && <div className="text-center mt-20"><LinearProgress /></div>}

      <h2>Welcome to my test page</h2>
      <DisplayComponent 
        items={posts} 
        onEdit={this.handleEdit} 
        onUpdate={this.handleUpdate}
        onCancel={this.handleCancel}
        onDelete={this.handleDelete}
        edited={edited}
      />
    </>)
  }
}

export default ItemsContainer;

