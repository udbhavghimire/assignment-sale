import Link from "next/link";
import Image from "next/legacy/image";
import CondoCard from "@/components/CondoCard";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import MainSearch from "@/components/MainSearch";
import "./icons.css";
import FeaturedCard from "@/components/FeaturedCard";
import Carousel from "@/components/Carousel";

async function getData(city) {
  const res = await fetch(
    "https://api.assignhome.ca/api/preconstructions-city/" +
      city +
      "?page_size=10&closing_year=2023",
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
  const data = await getData("mississauga");
  const milton_data = await getData("ajax");
  const burlington_data = await getData("burlington");

  // let dropdown_cities = await getCitiesandProjects();
  // const featured = await getFeaturedData();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      <div className="py-md-5 pt-3 pb-5  my-md-5 mt-2 mb-5 bg-red-50">
        <div className="py-md-5 pt-2 pb-5 mb-5 container">
          <Carousel />
        </div>
      </div>
      <div className="pt-5">
        <div className="container pt-5" id="projects">
          <div className="d-flex align-items-center justify-content-center text-center pt-5 pt-md-0">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link
                href={"assignment-for-sale/mississauga"}
                className="link-black "
              >
                Assignment For Sale in Mississauga
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ Assignment sale in Mississauga.
            </p>
            <Link
              href={"assignment-for-sale/mississauga"}
              className="mt-1 text-mine text-danger"
            >
              More Assignments in Mississauga{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-2 row-cols-md-4 gy-md-5 gx-3">
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

          <div className="pt-5">
            <div className="d-flex align-items-center justify-content-center text-center pt-5">
              <h2 className="fw-mine ccent-line fs-big pt-5">
                <Link
                  href={"assignment-for-sale/milton"}
                  className="link-black "
                >
                  Assignment For Sale in Milton
                </Link>
              </h2>
            </div>
            <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
              <p className="fs-5 mb-0 text-center">
                Explore 20+ Assignment for sale in Milton.
              </p>
              <Link
                href={"assignment-for-sale/milton"}
                className="mt-1 text-mine text-danger"
              >
                More Assignments in Milton{" "}
                <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-md-4  gy-md-4 gy-0 gx-3 gx-lg-3 ">
              {milton_data.preconstructions &&
                milton_data.preconstructions.slice(0, 8).map((item) => (
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
          </div>

          <div className="pt-5">
            <div className="d-flex align-items-center justify-content-center text-center pt-5">
              <h2 className="fw-mine ccent-line fs-big pt-5">
                <Link
                  href={"assignment-for-sale/burlington"}
                  className="link-black "
                >
                  Assignment For Sale in Burlington
                </Link>
              </h2>
            </div>
            <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
              <p className="fs-5 mb-0 text-center">
                Explore 20+ Assignment sale in Burlington.
              </p>
              <Link
                href={"assignment-for-sale/burlington"}
                className="mt-1 text-mine text-danger"
              >
                More Assignments in Burlington{" "}
                <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-md-4  gy-md-4 gy-0 gx-3 gx-lg-3 ">
              {burlington_data.preconstructions &&
                burlington_data.preconstructions.slice(0, 8).map((item) => (
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
          </div>
          <div className="py-5 my-2"></div>
          <h2 className="fw-mine text-center mb-5 accent-line fs-1 ">
            Explore New Assignment Sales In Ontario & Alberta
          </h2>
          <div className="container">
            <div className="row row-cols-md-5 row-cols-2">
              <div className="col">
                <Link
                  className="d-block properti_city"
                  href={"/assignment-for-saletoronto"}
                >
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
                      <p>Explore Assignments sale in Toronto</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link
                  className="d-block properti_city"
                  href={"assignment-for-sale/brampton"}
                >
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
                      <p>Explore Assignment sale in Brampton</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link
                  className="d-block properti_city"
                  href={"assignment-for-sale/etobicoke"}
                >
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
                      <p>Explore Assignment sale in Etobicoke</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link
                  className="d-block properti_city"
                  href={"assignment-for-sale/calgary"}
                >
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
                      <p>Explore Assignment sale in Calgary</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link
                  className="d-block properti_city"
                  href={"assignment-for-sale/mississauga"}
                >
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
                      <p>Explore Assignment sale in Mississauga</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

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
                Looking to buy a preconstruction assignment ?
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
                      Propertyassign.ca serves as an online database for
                      assignment sale. Assignhome compiles a list of assignments
                      available publicly on the internet and does not engage in
                      real estate transactions. Please note that the information
                      provided on this page may be outdated or inaccurate. By
                      submitting the above form, you consent to being contacted
                      by real estate agents advertising on this page. Your
                      information may be shared with our partners or advertisers
                      to assist with your inquiries. You can unsubscribe at any
                      time by emailing us.
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
