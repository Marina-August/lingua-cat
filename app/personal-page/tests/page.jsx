import Paw from "@/components/Paw";
import Test1 from "@/components/Test1";

const Tests =()=>{
    return(
        <div className="flex flex-col gap-64">
            <div className="flex gap-24">
                <div>
                    <h2>My Words</h2>
                </div>
                <div>
                    <h2>All Words</h2>
                </div>   
            </div>
            <div>
                <Paw/>
            </div>    
        </div>

        // <Test1/>
    )
}

export default Tests;