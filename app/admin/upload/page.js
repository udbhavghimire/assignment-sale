"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Upload() {
  let stat = {
    id: 1,
    project_name: "",
    price_starting_from: 0.0,
    price_to: 0.0,
    project_type: "Condo",
    description: "",
    occupancy: "",
    beds: 0,
    baths: 0,
    area: 0,
    city: {
      name: "",
    },
  };

  const routee = useRouter();
  const [predata, setPredata] = useState(stat);
  const [cities, setCities] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [uploadplans, setUploadPlans] = useState([]);
  const [uploadimages, setUploadImages] = useState([]);

  const handleImagesChange = (e) => {
    const prevImages = uploadimages;
    const selectedImages = Array.from(e.target.files);
    setUploadImages([...prevImages, ...selectedImages]);
  };

  const handlePlansChange = (e) => {
    const prevPlans = uploadplans;
    const selectedPlans = Array.from(e.target.files);
    setUploadPlans([...prevPlans, ...selectedPlans]);
  };

  useEffect(() => {
    axios
      .get("https://api.assignhome.ca/api/city/")
      .then((res) => {
        console.log(res.data.results);
        setCities(res.data.results);
        setPredata((prevState) => ({
          ...prevState,
          city: res.data.results[0],
        }));
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPredata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    let newData = { ...developerdata };
    newData["image"] = e.target.files[0];
    setDeveloperData(newData);
  };

  const handleChangeCity = (e) => {
    const { id, value } = e.target;
    let mycity = cities.filter((city) => city.name === value);
    let newcity = {
      id: mycity[0].id,
      name: mycity[0].name,
      slug: mycity[0].slug,
    };
    setPredata((prevState) => ({
      ...prevState,
      [id]: newcity,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(predata);
    console.log(uploadimages);
    console.log(uploadplans);

    if (
      predata.project_name === "" ||
      predata.price_starting_from === "" ||
      predata.price_to === "" ||
      predata.project_type === "" ||
      predata.city.name === "" ||
      predata.occupancy === "" ||
      predata.no_of_units === ""
    ) {
      swal("Please fill all the fields", "", "error");
      return;
    }

    let alldata = {
      predata: predata,
      images: uploadimages,
      plans: uploadplans,
    };

    axios
      .post("https://api.assignhome.ca/api/preconstructions/", alldata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRefetch(!refetch);
        swal("Project Uploaded Successfully", "", "success");
        setPredata(stat);
        routee.push("/admin/");
      })
      .catch((err) => {
        console.log(err.data);
        swal("Something went wrong", "", "error");
      });
  };

  const handleDeletePlan = (plan) => {
    let newplans = uploadplans.filter((p) => p !== plan);
    setUploadPlans(newplans);
  };

  const handleDeleteImage = (image) => {
    let newimages = uploadimages.filter((p) => p !== image);
    setUploadImages(newimages);
  };

  return (
    <>
      <div className="bg-white">
        <div className="container-fluid px-minn">
          <div className="d-flex justify-content-between pt-5">
            <Link href="/admin/" className="btn bg-white shadow">
              Go Back
            </Link>
            <h4 className="fw-bold">Upload New Assignment</h4>
          </div>
        </div>
        <div className="container-fluid px-minn py-5 mydetaill">
          <div className="row row-cols-2 bg-light py-5 px-3 rounded-mine">
            <div className="col-12">
              <div className="row row-cols-2 gy-4">
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="project_name"
                      value={predata.project_name}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="projectname">
                      Project Address <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
                      id="project_type"
                      value={predata.project_type}
                      onChange={(e) => handleChange(e)}
                      aira-label="Floating label select example"
                    >
                      <option value="Condo">Condo</option>
                      <option value="Townhome">Townhome</option>
                      <option value="Semi-Detached">Semi-Detached</option>
                      <option value="Detached">Detached</option>
                      <option value="NaN">NaN</option>
                    </select>
                    <label htmlFor="floatingSelect2">
                      Select Type <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      id="price_starting_from"
                      value={predata.price_starting_from}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="price">
                      Price <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="beds"
                      value={predata.beds}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="beds">
                      Bed <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="baths"
                      value={predata.baths}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="baths">
                      Bath <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      value={predata.area}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="area">
                      Area <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <input
                      type="number"
                      className="form-control"
                      id="occupancy"
                      value={predata.occupancy}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="Occupancy">
                      Occupancy <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
                      id="city"
                      onChange={(e) => handleChangeCity(e)}
                      aira-label="Floating label select example"
                    >
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingSelect">
                      Select City <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-minn pb-5 mydetaill">
          <p className="fs-5 fw-bold">Enter Description about the Project</p>

          <ReactQuill
            theme="snow"
            value={predata.description}
            style={{ height: "550px", marginBottom: "80px" }}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
              clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
              "video",
            ]}
            onChange={(newText) =>
              setPredata((prevState) => ({
                ...prevState,
                ["description"]: newText,
              }))
            }
          />
          <div className="row row-cols-md-2 row-cols-1 pt-4 pb-3">
            <div className="col shadow-lg">
              <div className="py-3">
                <label htmlFor="images" className="fw-bold">
                  Upload Photos
                </label>
                <br />
                <br />
                <input
                  type="file"
                  multiple
                  name="images"
                  id="images"
                  onChange={(e) => handleImagesChange(e)}
                />
              </div>
              <div className="col-12 pb-3">
                <div className="row row-cols-3">
                  {uploadimages &&
                    uploadimages.map((image) => (
                      <div className="col-4">
                        <img
                          src={URL.createObjectURL(image)}
                          className="img-fluid"
                        />

                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => handleDeleteImage(image)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col shadow-lg">
              <div className="py-3">
                <label htmlFor="plans" className="fw-bold">
                  Upload Plans
                </label>
                <br />
                <br />
                <input
                  type="file"
                  multiple
                  name="plans"
                  id="plans"
                  onChange={(e) => handlePlansChange(e)}
                />
              </div>
              <div className="col-12 pb-3">
                <div className="row row-cols-3">
                  {uploadplans &&
                    uploadplans.map((plan) => (
                      <div className="col-4">
                        <img
                          src={URL.createObjectURL(plan)}
                          className="img-fluid"
                        />

                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => handleDeletePlan(plan)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-3"></div>
          <div className="mt-5"></div>
          <div className="pt-5"></div>
          <div className="py-3 d-flex justify-content-center align-items-center d-block bg-white w-100 posss">
            <button
              className="btn btn-success btn-lg shadow-lg"
              onClick={(e) => handleSubmit(e)}
            >
              Upload now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
