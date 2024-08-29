import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReq, getAllReq, getIdReq } from '../Redux/Action/action';
import { useNavigate } from 'react-router-dom';
import './Table.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';

const Table = ({ id }) => {
  const [array, setArray] = useState([])
  const navigate = useNavigate();
  const state = useSelector((state) => state.crudReducer.item);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(() => {
    dispatch(getAllReq());
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setArray(state);
  }, [state]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteReq(id));
    await new Promise((Resolve) => {
      toast.error("Deleted Successfully", {
        position: 'top-right',
        onClose: Resolve,
        theme:'dark'
      })
    })
  };

  const handleEdit = (data) => {
    navigate('/Form', { state: { data } });
  }

  useEffect(() => {
    if (id) {
      dispatch(getIdReq(id));
    }
  }, [id, dispatch])

  return (
    <div>
      {loading ?
        (
          <Loading />) : (
          <>

            <h1 className='text-center text-white mt-3' style={{ fontFamily: "Fantasy", fontSize: "60px" }}>Datas</h1>

            {array && array.length > 0 ? (
              <div className='table-responsive px-5' >
              <table className='table table-bordered w-75 mx-auto mt-5' >
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>E-mail</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pin Code</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((row) => (
                    <tr key={row.id}>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.userName}</td>
                      <td>{row.city}</td>
                      <td>{row.state}</td>
                      <td>{row.pinCode}</td>
                      <td>{row.checkBox ? 'Active' : 'Inactive'}</td>
                      <td className='d-flex'>
                        <button className='btn' onClick={() => handleEdit(row)}><FaEdit /></button>
                        <button className='btn'
                          onClick={() => handleDelete(row.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p className='text-center text-danger mt-5' style={{ fontSize: "30px" }}> No Data!!!</p>
            )}
            </>
    )}
          </div>
      );
};

      export default Table;
