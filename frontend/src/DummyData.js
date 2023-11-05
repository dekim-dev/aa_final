const CreatedAt = () => {
  const today = new Date();
  return (
    <p>
      {today.getFullYear()}/{today.getMonth()}/{today.getDate()}
    </p>
  );
};
const originalPosts = [
  {
    id: 1,
    boardCategory: "board1",
    title:
      "1번 게시글 제목1번 게시글 제목1번 게시글 제목1번 게시글 제목1번 게시글 제목제목1번 게시글 제목1번 게시글 제목1번 게시글 제목1번 게시글 제목",
    content: "1번 게시글 내용",
    viewCount: 1,
    likes: 1,
    createdAt: <CreatedAt />,
    nickname: "user1",
  },
  {
    id: 2,
    boardCategory: "board2",
    title: "2번 게시글 제목",
    content: "2번 게시글 내용",
    viewCount: 2,
    likes: 2,
    createdAt: <CreatedAt />,
    nickname: "user2",
  },
];

const generateDummyPosts = (count) => {
  const dummyPosts = [];

  for (let i = 3; i <= count; i++) {
    dummyPosts.push({
      id: i,
      boardCategory: `board${(i % 5) + 1}`,
      title: `${i}번 게시글 제목`,
      content: `${i}번 게시글 내용`,
      viewCount: i,
      likes: i,
      createdAt: <CreatedAt />,
      nickname: `user${i}`,
    });
  }

  return dummyPosts;
};

const additionalPosts = generateDummyPosts(57);

export const posts = [...originalPosts, ...additionalPosts];
