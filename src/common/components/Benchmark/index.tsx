import {asyncComponent} from "react-async-component";

declare let System: any;

export default asyncComponent({
    resolve: () => System.import('./BenchmarkRoute')
})