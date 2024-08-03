import React from "react";
import Filters from "@/components/Filters";
import BottomContactForm from "@/components/BottomContactForm";
import Link from "next/link";

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${params.city}`,
    },
    title: `Top New condos, townhomes and detached home assignment sales in ${city}`,
    description: `Discover stunning new condos, townhouse and detached homes assignment sales in ${city}. Find your dream property in our latest developments. Tour new builds today!`,
  };
}

export default function Home({ params }) {
  let filteredProjects = [];

  const handleFilteredData = (data) => {
    filteredProjects = data;
  };

  return (
    <>
      <div className="pt-lg-5 pt-3">
        <div className="container">
          <div className="d-flex">
            <div>
              <h1 className="main-title font-family2 pb-2 pb-md-0">
                Assignments for Sale in {CapitalizeFirst(params.city)}{" "}
                <span className="nextline-sm"> ( 2024 )</span>
              </h1>
            </div>
          </div>
          <p className="font-normal sm-center pb-2 pb-md-0 mb-0 fw-medium text-lg">
            Discover new condo, townhouse, or detached home assignments for sale
            in {CapitalizeFirst(params.city)}.
          </p>
          <Filters
            city={params.city}
            /* setFilteredProjects={handleFilteredData} */
          />
          {/* <div className="row row-cols-1 row-cols-md-4 gy-4 gx-3 gx-lg-3">
            {filteredProjects.map((item, no) => (
              <div className="col" key={item.id}>
                <script
                  key={item.slug}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(PreconSchema(item)),
                  }}
                />
                <CondoCard {...item} no={no} />
              </div>
            ))}
          </div> */}
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="contact">
            <div className="container">
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3"></h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6" id="contact">
                  <BottomContactForm />
                  <div className="d-flex text-center">
                    <p className="small-text2 mb-3 text-center">
                      Condomonk.ca serves as an online database for
                      pre-construction homes. Condomonk compiles a list of
                      projects available publicly on the internet and does not
                      engage in real estate transactions.
                    </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
