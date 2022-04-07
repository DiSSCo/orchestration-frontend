import React from "react";

const Job = ({job}) => {
    const convertEpochToTime =  (time) => {
        return new Date(time * 1000).toISOString()
    }

    return (
        <tr key={job.name}>
            <td>{job.jobName}</td>
            <td>{job.jobStatus}</td>
            <td>{convertEpochToTime(job.startTime)}</td>
            <td>{convertEpochToTime(job.completedAt)}</td>
        </tr>
    )
}
export default Job