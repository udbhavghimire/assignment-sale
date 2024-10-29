import Link from "next/link";

const ListingTable = ({
  preconstructions,
  handleDelete,
  filters,
  page,
  itemsPerPage,
}) => {
  const filteredPreconstructions = preconstructions.filter(
    (preconstruction) => {
      return (
        (filters.status === "All" ||
          preconstruction.status === filters.status) &&
        (filters.city === "All" || preconstruction.city.slug === filters.city)
      );
    }
  );

  return (
    <div className="container table-responsive">
      <table className="table table-striped">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">Project Name</th>
            <th scope="col">City</th>
            <th scope="col">Project Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPreconstructions.map((preconstruction, index) => (
            <tr key={index}>
              <th scope="row">{(page - 1) * itemsPerPage + (index + 1)}</th>
              <td>{preconstruction.project_name}</td>
              <td>{preconstruction.city.name}</td>
              <td>{preconstruction.project_type}</td>
              <td>
                <Link
                  href={"/admin/upload/" + preconstruction.id}
                  className="btn btn-sm btn-outline-dark"
                >
                  Edit
                </Link>
                <span className="mx-2"></span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => handleDelete(e, preconstruction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
