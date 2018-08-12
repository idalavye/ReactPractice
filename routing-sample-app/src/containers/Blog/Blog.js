import React, { Component } from 'react';
// import axios from 'axios';
import { Route,Link } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?query-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                
                {/* <Route path="/" exact={true} render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2</h1>}/> */}

                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" component={NewPost}/>
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