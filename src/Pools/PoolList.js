

export const PoolList = ({poolsState}) => {

    return (
        <div>
            <h2 className='pools-heading'>Pick a Pool</h2>
            <ul className='no-bullet'>
                {poolsState.isError &&<p>Something went wrong...</p>}
            
                {poolsState.isLoading ? (<p>Loading...</p>):
                poolsState.pools.map(pool =>(

                    <li key={pool.id}>
                        <button 
                        className='pool-button'
                        // onClick={() => handlePoolSelect(pool)}
                        >
                            {pool.pool_name}
                        </button>
                    </li>
                )).reverse()}
            </ul>
        </div>
    )
}