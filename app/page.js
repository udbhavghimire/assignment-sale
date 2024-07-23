import Link from "next/link";
import Image from "next/legacy/image";
import CondoCard from "@/components/CondoCard";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import MainSearch from "@/components/MainSearch";
import "./icons.css";
import FeaturedCard from "@/components/FeaturedCard";

async function getData(city) {
  const res = await fetch(
    "https://api.assignhome.ca/api/preconstructions-city/" +
      city +
      "?page_size=10",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getCities() {
  const res = await fetch("https://api.assignhome.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getFeaturedData() {
  const res = await fetch(
    "https://api.assignhome.ca/api/preconstructions/?is_featured=True",
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Home(props) {
  const data = await getData("calgary");
  const mississauga_data = await getData("mississauga");
  const edmonton_data = await getData("edmonton");
  const cambridge_data = await getData("cambridge");
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();
  const featured = await getFeaturedData();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      {/* 
      <section id="hero">
        <div className="container">
          <div className=" hero-container">
            <div>
              <h1 className="main-titlee pb-0  mb-0 mt-2 mt-md-0 ">
                <span className="d-block ">Canada's</span> leading{" "}
                <span className="text-warning">pre construction </span>homes
                Platform
              </h1>
              <p className="titlee text-center mt-0 pt-1 text-white">
                Get first updates on New Construction Homes Projects across
                Canada
              </p>
            </div>

            <div className="pb-1 pt-3 d-flex justify-content-center align-items-center">
            </div>
          </div>
        </div>
      </section> */}

      <div className="pt-5 ">
        <div className="container pt-5 " id="projects">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link href={"/calgary"} className="link-black font-family2">
                Assignment For Sale in Calgary
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ Assignment for sale in Calgary
            </p>
            <Link href={"/calgary"} className="mt-1 text-mine text-danger">
              More Assignments in Calgary{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gx-3">
            {data.preconstructions &&
              data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          <div className="py-5 my-2"></div>
          <h2 className="fw-mine text-center mb-5 accent-line fs-1 font-family2">
            Explore New Assignment Sales In Ontario & Alberta
          </h2>
          <div className="container">
            <div className="row row-cols-md-5 row-cols-2">
              <div className="col">
                <Link className="d-block properti_city" href={"/toronto"}>
                  <div className="thumb">
                    <img
                      src="/cities/toronto.jpg"
                      alt="toronto"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Toronto</h4>
                      <p>Explore Assignments for sale in Toronto</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/brampton"}>
                  <div className="thumb">
                    <img
                      src="/cities/brampton.jpg"
                      alt="brampton"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Brampton</h4>
                      <p>Explore Assignments for sale in Brampton</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/etobicoke"}>
                  <div className="thumb">
                    <img
                      src="/cities/etobicoke.jpg"
                      alt="etobicoke"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Etobicoke</h4>
                      <p>Explore Assignments for sale in Etobicoke</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/calgary"}>
                  <div className="thumb">
                    <img
                      src="/cities/calgary.jpeg"
                      alt="calgary"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Calgary</h4>
                      <p>Explore Assignments for sale in Calgary</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/mississauga"}>
                  <div className="thumb">
                    <img
                      src="/cities/mississauga.jpg"
                      alt="mississauga"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Mississauga</h4>
                      <p>Explore Assignments for sale in Mississauga</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big">
              <Link href={"/mississauga"} className="link-black font-family2">
                Assignment For Sale in Mississauga
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ Assignment for Sale in Mississauga
            </p>
            <Link href={"/mississauga"} className="mt-1 text-mine text-danger">
              More Assignments in Mississauga{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gy-3 gx-3">
            {mississauga_data.preconstructions &&
              mississauga_data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>

          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link href={"/edmonton"} className="link-black font-family2">
                Assignment For Sale in Edmonton
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ Assignment for Sale in Edmonton
            </p>
            <Link href={"/edmonton"} className="mt-1 text-mine text-danger">
              More Assignments in Edmonton{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gy-3 gx-3">
            {edmonton_data.preconstructions &&
              edmonton_data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>

          <div className="py-5 my-2"></div>

          {/* <div className="py-5 mt-md-5 mt-0">
            <div className="text-center py-5 my-5 overlay-container">
              <img
                src="/heroBanner.png"
                className="img-fluid d-md-block d-none"
                alt=""
              />
              <img
                src="/heroBanner-sm.png"
                className="img-fluid d-md-none d-block"
                alt=""
              />
            </div>
          </div> */}

          <div className="pt-md-5 pt-0 mt-md-5 mt-0"></div>
          <div className="py-5 my-md-5 my-0" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <Image
                  src="/contact-bottom-2.png"
                  alt="Contact bottom"
                  width={300}
                  height={250}
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3 ">
                Looking to buy a preconstruction home ?
              </h2>

              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <BottomContactForm
                    proj_name="All"
                    city="Home Page"
                  ></BottomContactForm>
                  <div className="d-flex">
                    <p className="small-text2 mb-3 text-center">
                      Condomonk.ca serves as an online database for
                      pre-construction homes. Condomonk compiles a list of
                      projects available publicly on the internet and does not
                      engage in real estate transactions. Please note that the
                      information provided on this page may be outdated or
                      inaccurate. By submitting the above form, you consent to
                      being contacted by real estate agents advertising on this
                      page. Your information may be shared with our partners or
                      advertisers to assist with your inquiries. You can
                      unsubscribe at any time by emailing us.
                    </p>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
