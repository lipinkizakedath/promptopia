'use client';
import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardLList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [post, setPost] = useState([]);
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const resp = await fetch('/api/prompt');
      const data = await resp.json();
      setPost(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or usename"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardLList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
