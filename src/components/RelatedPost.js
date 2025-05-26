import React, { useEffect, useState } from 'react';
import { Sitem } from './index';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const RelatedPost = ({ newPost }) => {
    const { newPosts, outStandingPost } = useSelector(state => state.post);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newPost) {
            dispatch(actions.getNewPosts());
        } else {
            dispatch(actions.getOutStandingPost());
        }
    }, [newPost, dispatch]);

    useEffect(() => {
        if (newPost) {
            setPosts(newPosts); // Hiển thị tất cả tin mới
        } else {
            setPosts(outStandingPost?.slice(0, 5) || []); // Giới hạn 5 tin nổi bật
        }
    }, [newPost, newPosts, outStandingPost]);

    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>
                {newPost ? 'Tin mới đăng' : 'Tin nổi bật'}
            </h3>
            <div className='w-full flex flex-col gap-2'>
                {posts?.length > 0 ? (
                    posts.map(item => (
                        <Sitem
                            key={item.id}
                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={
                                item.images?.image
                                    ? JSON.parse(item.images.image)
                                    : []
                            }
                            star={newPost ? null : item.star} // Không truyền star cho Tin mới đăng
                        />
                    ))
                ) : (
                    <p>Không có bài viết nào.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedPost;