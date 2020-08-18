import React from "react";

import ArticleContentCollection from "./article-content-collection";
import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import Stack from "./ui/layouts/stack";
import { Article_ArticleFragment } from "../generated/graphql-types";

type ArticleProps = {
  article: Article_ArticleFragment;
};

const Article: React.FCWithFragments<ArticleProps> = ({ article }) => {
  return (
    <article>
      <Stack scale="4">
        <Stack scale="2">
          <HeadlineText level="1">{article.title}</HeadlineText>
          <BodyText type="secondary">
            {new Date(article.sys.publishedAt).toLocaleDateString()}
          </BodyText>
        </Stack>

        <img
          src={article.previewImage.url}
          title={article.previewImage.title}
          alt={article.previewImage.description}
        />

        <ArticleContentCollection article={article} />
      </Stack>
    </article>
  );
};

Article.fragments = {
  article: /* GraphQL */ `
    fragment Article_article on Article {
      title
      slug
      previewImage {
        title
        description
        url
      }
      sys {
        publishedAt
      }
      ...ArticleContentCollection_article
    }
    ${ArticleContentCollection.fragments.article}
  `,
};

export default Article;
