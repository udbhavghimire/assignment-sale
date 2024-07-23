import Nformatter from "@/components/Nformatter";
import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import Breadcrumb from "@/components/Breadcrumb";
import SideContactForm from "@/components/SideContactForm";
import FixedContactButton from "@/components/FixedContactButton";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import CustomModal from "@/components/Modal";
import Map from "@/components/Map";

// Define your functions outside of the component
async function getData(slug) {
  const res = await fetch(
    "https://api.assignhome.ca/api/preconstructions-detail/" + slug,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getRelatedData(city) {
  const res = await fetch(
    "https://api.assignhome.ca/api/related-precons/" + city,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }, parent) {
  const data = await getData(params.slug);

  return {
    ...parent,
    alternates: {
      canonical: `https://assignhome.ca/${params.city}/${params.slug}`,
    },
    title: data.project_name + " in " + data.city.name,
    description:
      data.project_name +
      " in " +
      data.city.name +
      " prices starting from " +
      Nformatter(data.price_starting_from, 2) +
      " CAD",
  };
}

export default async function Home({ params }) {
  const data = await getData(params.slug);
  const related = await getRelatedData(params.city);

  const newImages = (images) => {
    let neImgs = images;
    neImgs.forEach((image) => {
      image.image = "https://api.assignhome.ca" + image.image;
    });
    for (let i = images.length; i < 7; i++) {
      neImgs.push({
        id: 0,
        image: "https://condomonk.ca/noimage.webp",
      });
    }
    return neImgs;
  };

  const doTOcheck = (noo) => {
    if (parseInt(noo) != 0) {
      return "- High $ " + Nformatter(noo, 2);
    }
  };

  const doTOcheck2 = (noo) => {
    const parsedPrice = parseFloat(noo);

    if (!isNaN(parsedPrice) && parsedPrice > 0) {
      return `$${parsedPrice.toLocaleString()}`;
    } else {
      return `Pricing not available`;
    }
  };

  function checkPricing(prii, priito) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return doTOcheck2(prii);
    }
  }

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-lg-1 pt-0">
        <div className="container ">
          <Breadcrumb
            homeElement={"Home"}
            separator={
              <span>
                {" "}
                <svg
                  className="svg minearr"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                    fill={"#869099"}
                  ></path>
                </svg>{" "}
              </span>
            }
            activeClasses="text-dark"
            containerClasses="d-flex align-items-center p-0 m-0 pt-lg-4 pt-2 breadcrumb"
            listClasses="mx-1"
            capitalizeLinks
          />

          <Gallery
            images={data.image}
            project_name={data.project_name}
            project_address={data.project_address}
          ></Gallery>

          <div className="container  px-0 pt-3">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 justify-content-center">
              <div className="col col-md-6 pe-md-5 pe-0">
                <div className="screenshot ">
                  <div className="row row-cols-1 row-cols-sm-2">
                    <div className="col-sm-12">
                      <div className="d-flex gap-3 my-2">
                        <div className=" btn btn-sm btn-white shadow ">
                          <span className="col fs-esmall">
                            {data.city.name}
                          </span>
                        </div>
                        <div className=" btn btn-sm btn-danger ">
                          <span className="col  ">{data.project_type}</span>
                        </div>
                      </div>

                      {/* <h1 className="side  fw-mine font-family2">
                        {data.preconstruction.project_name}
                      </h1> */}
                      {/* <p className="mb-0">
                        By{" "}
                        <strong>{data.preconstruction.developer.name}</strong>
                      </p> */}

                      <h1 className="text-mine  fw-mine mt-1 mb-0 text-danger font-family2 mb-1 pricefs1">
                        {checkPricing(data.price_starting_from)}
                      </h1>
                      <div className="rounded-mine">
                        <div>
                          <div className="mb-1">
                            <span className=" fw-mine2 mb-2 fs-mine3"></span>
                            <span scope="col">{data.project_name}</span>
                          </div>
                          <div className="bg-light mt-5">
                            <div className="row row-cols-md-4 row-cols-1 text-dark py-3 ps-3 ">
                              <div className="col mb-3 ">
                                <h6 className="fw-bold">Bedroom</h6>
                                <span>{data.beds}</span>
                              </div>
                              <div className="col mb-3 ">
                                <h6 className="fw-bold">Bathroom</h6>
                                <span>{data.baths}</span>
                              </div>
                              <div className="col mb-3 ">
                                <h6 className="fw-bold">Area</h6>
                                <span>{data.area} sq.ft.</span>
                              </div>
                              <div className="col mb-3 ">
                                <h6 className="fw-bold">City</h6>
                                <span>{data.city.name}</span>
                              </div>
                              <div className="col mb-3">
                                <h6 className="fw-bold">Assignment Type</h6>
                                <span>{data.project_type}</span>
                              </div>
                              <div className="col mb-3">
                                <h6 className="fw-bold">Occupancy</h6>
                                <span>{data.occupancy}</span>
                              </div>
                            </div>
                          </div>

                          {/* <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Number Of Floor Plans:
                            </span>
                            <span scope="col">
                              {" "}
                              <CustomModal
                                linkText="Request Number of Floor Plans"
                                proj_name={data.preconstruction.project_name}
                                defaultmessage={
                                  "Please send me floor plan details of " +
                                  data.preconstruction.project_name +
                                  ".  Thank you"
                                }
                                city={data.preconstruction.city.name}
                              />
                            </span>
                          </div> */}

                          {/* <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Parking Price:
                            </span>
                            <span scope="col">
                              {" "}
                              <CustomModal
                                linkText="Request Parking Price"
                                proj_name={data.preconstruction.project_name}
                                defaultmessage={
                                  "Please send me parking price details of " +
                                  data.preconstruction.project_name +
                                  ".  Thank you"
                                }
                                city={data.preconstruction.city.name}
                              />
                            </span>
                          </div> */}

                          {/* <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Locker Price:
                            </span>
                            <span scope="col">
                              {" "}
                              <CustomModal
                                linkText="Request Locker Price"
                                proj_name={data.preconstruction.project_name}
                                defaultmessage={
                                  "Please send me locker price details of " +
                                  data.preconstruction.project_name +
                                  ".  Thank you"
                                }
                                city={data.preconstruction.city.name}
                              />
                            </span>
                          </div> */}

                          {/* <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Estimated Maintenance Fee:
                            </span>
                            <span scope="col">
                              {" "}
                              <CustomModal
                                linkText="Request Est Maintenance"
                                proj_name={data.preconstruction.project_name}
                                defaultmessage={
                                  "Please send me estimated maintenance fee of " +
                                  data.preconstruction.project_name +
                                  ".  Thank you"
                                }
                                city={data.preconstruction.city.name}
                              />
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {/* <CustomModal
                      linkText={
                        <span className="custom-button mt-5">
                          Click here to get the latest information today!
                        </span>
                      }
                      proj_name={data.preconstruction.project_name}
                      defaultmessage={
                        "Please send me the latest information of " +
                        data.preconstruction.project_name +
                        ".  Thank you"
                      }
                      city={data.preconstruction.city.name}
                    /> */}
                    <div className="pb-5 mt-5">
                      <h2 className="fw-bold  fs-big font-family2 pt-5">
                        Listing Description
                      </h2>
                      <div className="text-start my-3 text-inside">
                        <div
                          className="iframe-container custom-description-container leading-8"
                          dangerouslySetInnerHTML={{
                            __html: data.description,
                          }}
                        ></div>
                      </div>
                      <CustomModal
                        linkText={
                          <span className="btn  btn-danger rounded-pill shadow-lg">
                            Send me more info{" "}
                          </span>
                        }
                        proj_name={data.project_name}
                        defaultmessage={
                          "Please send me more information about " +
                          data.project_name +
                          ".  Thank you"
                        }
                        city={data.city.name}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="py-3 my-5">
                  <h2 className="fw-bold fs-4 pb-3 font-family2">
                    Walk Score for {data.project_name}
                  </h2>

                  <div>
                    <div className="p-1">
                      <div className="walkscore-container mt-2 p-1 rounded-mine">
                        <iframe
                          height="500px"
                          title="Walk Score"
                          className="ham"
                          width="100%"
                          src={
                            "https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=" +
                            convDash(data.project_address) +
                            "&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737"
                          }
                        ></iframe>
                        <script
                          type="text/javascript"
                          src="https://www.walkscore.com/tile/show-walkscore-tile.php"
                        ></script>
                      </div>
                      <div className="pt-5">
                        <p className="text-small text-secondary">
                          Note:{" "}
                          <Link href="https://condomonk.ca/" target="_blank">
                            Condomonk
                          </Link>{" "}
                          is Canada's one of the largest database of new pre
                          construction homes. Our comprehensive database is
                          populated by our research and analysis of publicly
                          available data.preconstruction. Condomonk strives for
                          accuracy and we make every effort to verify the
                          information. The information provided on Condomonk.ca
                          may be outdated or inaccurate. Condomonk Inc. is not
                          liable for the use or misuse of the site's
                          information.The information displayed on condomonk.ca
                          is for reference only. Please contact a liscenced real
                          estate agent or broker to seek advice or receive
                          updated and accurate information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="col col-md-4 ps-md-2 pt-5 pt-md-0" id="contact">
                <div className="py-4 py-md-0"></div>
                <div className="side-fix-contact mt-mine pe-0">
                  {/* <div className="text-center">
                    <img
                      alt="Register Now Text Design"
                      src="/contact-me.png"
                      className="img-fluid mb-3 side-contact-img"
                    />
                  </div> */}
                  <div className="m-1 p-4 py-3 shadow-lg rounded-mine bordt form-color">
                    {/* <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-4">
                        {data.partner[0] && (
                          <img
                            src={`https://api.assignhome.ca${data.partner[0].image}`}
                            alt="dce"
                            className="partner-img "
                          />
                        )}
                        {!data.partner[0] && (
                          <img
                            src="/contact-bottom-2.png"
                            alt="dce"
                            className="agent-img"
                          />
                        )}
                      </div>
                      <div className="col-8 text-center">
                        <h5 className="fw-bold  fs-4 ">
                          {data.partner[0] &&
                            data.partner[0].partner_type != "Brokerage" && (
                              <>{data.partner[0].name}</>
                            )}

                          {!data.partner[0] && "Receive a Call"}
                        </h5>

                        <span className="mt-5 fs-6 text-center">
                          {data.partner[0] && data.partner[0].brokerage_name}
                        </span>

                        <p
                          className="mb-0 bva2 mt-1 d-flex justify-content-center"
                          data-tip
                          data-for="registerTip"
                        >
                          Condomonk Verified Partner
                          <span>
                            <sup>
                              <img
                                src="/cc.png"
                                alt="verfied"
                                className="img-fluid small-i ms-1"
                              />
                            </sup>
                          </span>
                        </p>
                      </div>
                    </div> */}
                    <div className="row  align-items-start pt-3">
                      {/* <div className="col-4">
                        <img
                          src="/contact-image.png"
                          alt="contact image"
                          className="agent-img"
                        />
                      </div> */}
                      <div className="text-center">
                        <h5 className="fw-bold text-center linem fs-1 text-danger mb-0 font-family2">
                          Assignment For Sale
                        </h5>

                        {/* <p className="mb-0 text-small pt-2 text-center">
                          Register to Receive Guaranteed Platinum Access &
                          Prices, Incentives & Discounts, Floor Plans & More!
                        </p> */}
                      </div>
                    </div>
                    <div className="my-3"></div>
                    <SideContactForm
                      proj_name={data.project_name}
                      defaultmessage={
                        "Please send me additional information about " +
                        data.project_name +
                        ".  Thank you"
                      }
                      city={data.city.name}
                    ></SideContactForm>
                    <div className="d-flex">
                      <p className="small-text2 mb-3 text-center">
                        Condomonk.ca serves as an online database for
                        pre-construction homes. Condomonk compiles a list of
                        projects available publicly on the internet and does not
                        engage in real estate transactions. Please note that the
                        information provided on this page may be outdated or
                        inaccurate. By submitting the above form, you consent to
                        being contacted by real estate agents advertising on
                        this page. Your information may be shared with our
                        partners or advertisers to assist with your inquiries.
                        You can unsubscribe at any time by emailing us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 my-md-5"></div>
          {/* <div>
            <Map />
          </div> */}

          <div className="py-5 my-5"></div>
        </div>
      </div>
    </>
  );
}
