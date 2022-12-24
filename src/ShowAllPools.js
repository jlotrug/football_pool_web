


export const ShowAllPools = ({allPools}) => {

    return (
        <div>
            <ul>
                {allPools.map(pool =>(
                    pool.getName()
                ))}
            </ul>
        </div>
    )
} 