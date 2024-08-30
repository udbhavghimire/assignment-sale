"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ListingTable from "@/components/ListingTable";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const [filters, setFilters] = useState({
    city: "All",
    status: "All",
    typee: "All",
  });
  const [preconstructions, setPreConstructions] = useState([]);
  const [cities, setCities] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Set items per page

  function handleChange(e) {
    setFilters({ ...filters, [e.target.id]: e.target.value });
    setPage(1); // Reset to the first page when filters change
  }
  useEffect(() => {
    // Fetch preconstructions based on filters and pagination
    axios
      .get(
        `https://api.assignhome.ca/api/preconstructions/?city=${filters.city}&project_type=${filters.typee}&page=${page}&page_size=${itemsPerPage}`
      )
      .then((res) => {
        console.log(res.data.results);
        setPreConstructions(res.data.results);
        setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
      });

    // Fetch cities list
    axios
      .get("https://api.assignhome.ca/api/city/?all")
      .then((res) => {
        setCities(res.data.results);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
      });
  }, [filters, page]);

  const handleDelete = (e, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this listing!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePreConstruction(id);
        swal({
          text: "Your listing has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled",
          text: "Your listing is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deletePreConstruction(id) {
    axios
      .delete(`https://api.assignhome.ca/api/preconstructions/${id}/`)
      .then((res) => {
        console.log(res);
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  function checkPrev() {
    return page > 1;
  }

  function checkNext() {
    return preconstructions && page < totalPages;
  }

  return (
    <>
      <div className="py-md-4 py-2 w-100">
        <div className="row row-cols-2 row-cols-md-5 d-flex align-items-center mx-0 g-3">
          {/* City Filter */}
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="city"
                value={filters.city}
                onChange={(e) => handleChange(e)}
                aria-label="Floating label select example"
              >
                <option value="All">All</option>
                {cities &&
                  cities.map((city) => (
                    <option key={city.id} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="floatingCity">Select City</label>
            </div>
          </div>

          {/* Project Type Filter */}
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="typee"
                value={filters.typee}
                onChange={(e) => handleChange(e)}
                aria-label="Floating label select example"
              >
                <option value="All">All</option>
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
                <option value="Detached">Detached</option>
                <option value="Semi-Detached">Semi-Detached</option>
              </select>
              <label htmlFor="typee">Select Project Type</label>
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="status"
                value={filters.status}
                onChange={(e) => handleChange(e)}
                aria-label="Floating label select example"
              >
                <option value="All">All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Selling">Selling</option>
                <option value="Sold out">Sold out</option>
              </select>
              <label htmlFor="status">Select Status</label>
            </div>
          </div>

          {/* Add New Assignment Button */}
          <div className="col-md-3 d-flex justify-content-end">
            <Link href="/admin/upload/" className="btn btn-success py-3">
              Add New Assignment
            </Link>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-lg btn-dark me-4"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Previous Page
        </button>
        <span className="fw-bold d-none d-md-block">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-lg btn-dark"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
          <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>

      {/* Listing Table */}
      <div className="mt-4"></div>
      <ListingTable
        preconstructions={preconstructions}
        handleDelete={handleDelete}
        filters={filters}
        setFilters={setFilters}
        page={page}
        itemsPerPage={itemsPerPage} // Passing itemsPerPage to ListingTable
      />
    </>
  );
}
