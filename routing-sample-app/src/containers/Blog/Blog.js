import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    /**
     * Dynamic import syntax,
     * Aşardki şekilde bir kullanımda AsyncNewMost çağrıldığı zaman NewPost.js dosyası import edilecek.
     */
    return import('./NewPost/NewPost');
    /**
     * Kodumuz çalışırken NewPost main bundle dosyamıza eklenmez, böylelikle daha düşük boyutta bir kaynak kodumuz olur.
     * New Post nav itemına tıkladığımız zaman NewPost.js dosyası exstra bir bundle olarak eklenir. Ve ihtiyacımız olduğu
     * zaman kullanmış oluruz. Bu şekilde tüm kodun aynı anda yüklenmesini kısıtlamış oluruz.
     */
})

class Blog extends Component {

    state = {
        auth: true
    }

    componentDidMount() {
        //If unauth : this.props.history.replace('/posts');
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?query-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* <Route path="/" exact={true} render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2</h1>}/> */}


                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => {
                        return (
                            <h1>Not Found</h1>
                        );
                    }} />

                    {/* <Redirect from='/' to="/posts"/> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

/**
 * Route işleminde path prefix olarak çalışır. Sonuna bir şey eklendiği zaman bile çalışır.
 * Eğer çalışmasını istemiyorsak exact kullanmalıyız.   
 * exact = kesin,tam
 */

export default Blog;