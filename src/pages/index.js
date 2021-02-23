import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "工作",
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        对自己所做的负责，保质保量，做到最好，当你存在过剩能力的时候，才是提高。
      </>
    ),
  },
  {
    title: "学习",
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        学习不是目的，而是过程，无论什么事情，只要报以虚心，勤于思考，便会有所收获
      </>
    ),
  },
  {
    title: "兴趣",
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        除了工作，我们还有生活；除了白天，还有晚上；好的身体，丰富的思想，才能承载这日复一的一日
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className='text--center'>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className='container'>
          <h1 className='hero__title'>{siteConfig.title}</h1>
          <p className='hero__subtitle'>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {
          <div className={styles.title}>
            <h1 className='row'>taoists.js</h1>
            <div className='row'>
              taoists
              是取道家的英文。其目的是希望我们能够从无到有，然后一生二，二生三，三生万物。能够做到我们能做到的最好。
            </div>
          </div>
        }
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className='container'>
              <div className='row'>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
