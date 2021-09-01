import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Employee } from 'types/employee';
import { hasAnyRoles } from 'util/auth';
//import { getEmployessResponse } from '../__tests__/fixtures';

type ControlComponentsData = {
  activePage: number;
};

const List = () => {

  const getEmployessResponse = {
    content: [
      {
        id: 5,
        name: 'Alex',
        email: 'alex@gmail.com',
        department: {
          id: 1,
          name: 'Sales',
        },
      },
      {
        id: 2,
        name: 'Ana',
        email: 'ana@gmail.com',
        department: {
          id: 2,
          name: 'Management',
        },
      },
      {
        id: 12,
        name: 'Andressa',
        email: 'andressa@gmail.com',
        department: {
          id: 2,
          name: 'Management',
        },
      },
      {
        id: 3,
        name: 'Bob',
        email: 'bob@gmail.com',
        department: {
          id: 1,
          name: 'Sales',
        },
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 4,
      unpaged: false,
      paged: true,
    },
    last: false,
    totalPages: 4,
    totalElements: 16,
    size: 4,
    number: 0,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    first: true,
    numberOfElements: 4,
    empty: false,
  };
  
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const [page, setPage] = useState<SpringPage<Employee>>();

  const getEmployees = useCallback(() => {
    
      setPage(getEmployessResponse);

  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber });
  };

  return (
    <>
    {hasAnyRoles(['ROLE_ADMIN']) ? 
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link> : <div></div>}

      <div className="row">
        {page?.content.map((employee) => (
          <div key={employee.id} className="col-sm-6 col-md-12">
            <EmployeeCard employee={employee} />
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
