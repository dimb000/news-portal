import React from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import "isomorphic-fetch";

import SalaryReportForm from "../../components/salary-report-form";
import getTechnologies, { Technology } from "../../api/market/get-technologies";
import getCities, { City } from "../../api/market/get-cities";
import getPositions, { Position } from "../../api/market/get-positions";
import { getHeadTitle } from "../../utils/head-title";
import styles from "./share.module.scss";

type ShareSalaryPageProps = {
  positions: Position[];
  cities: City[];
  technologies: Technology[];
};

export const getServerSideProps: GetServerSideProps<ShareSalaryPageProps> = async () => {
  const cityCollection = await getCities().catch(() => ({ items: [] }));
  const positionCollection = await getPositions().catch(() => ({ items: [] }));
  const technologyCollection = await getTechnologies().catch(() => ({
    items: [],
  }));

  return {
    props: {
      positions: positionCollection.items,
      cities: cityCollection.items,
      technologies: technologyCollection.items,
    },
  };
};

const ShareSalaryPage: NextPage<ShareSalaryPageProps> = ({
  positions,
  cities,
  technologies,
}) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle("Share Salary")}</title>
      </Head>

      <div className={styles.content}>
        <SalaryReportForm
          positions={positions}
          cities={cities}
          technologies={technologies}
        />

        <img className={styles.illustration} src="/data-report.svg" alt="" />
      </div>
    </>
  );
};

export default ShareSalaryPage;
