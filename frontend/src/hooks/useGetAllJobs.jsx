import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true }
                );
                if (res?.data?.success) {
                    dispatch(setAllJobs(res?.data?.jobs));
                } else {
                    console.error("Failed to fetch jobs:", res?.data?.message);
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    console.error("Unauthorized: Please log in again.");
                } else {
                    console.error("An error occurred while fetching jobs:", error);
                }
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
