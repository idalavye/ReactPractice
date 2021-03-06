import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error:false
    }

    componentDidMount(){
        /**
         * Aşardaki sonucu const post = .... şekilde post değşkeninde saklamak istersek 
         * sıkıntı çıkacaktır. Çünkü javascript asenkron bir yapıda çalıştığı için 
         * verilerin yüklenmesini beklemeden bir alt satırdan işlem yapmaya devam edecktir.
         * Ama const kullanmadan .then yapısı ile birlikte kullanırsak axios bize verilerin yüklenmesini
         * bekleyecektir.
         */

        axios.get('/posts')
                    .then(response => {
                        const posts = response.data.slice(0,4);
                        const updatedPosts = posts.map((post)=>{
                            return{
                                ...post,
                                author:'İbrahim'
                            };
                        });
                        this.setState({posts:updatedPosts});
                        //console.log(response);
                    })
                    .catch(error => {
                        this.setState({error:true});
                        //console.log(error);
                    });

        /**
         * this.setState metodu then metodunun dışında olsaydı verileri alamazdık. Çünkü 
         * verilerin yüklenmesini beklemeden boş diziyi atıp program çalışmaya devam ederdi.
         */
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId:id
        });
    }

    render () {

        let posts = <p style={{textAlign:'center'}}>Something went wrong!!</p>
        if(!this.state.error){
            posts = this.state.posts.map((post) => {
                return(
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;