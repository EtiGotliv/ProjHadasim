import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
//import Public from "./components/public"
//import Login from "./features/auth/Login"
import DashLayout from './components/DashLayout'
import Welcome from "./features/auth/welcome"
import DiseaseList from "./features/diseases/DiseaseList"
import MembersList from "./features/members/MembersList"
import VaccinList from "./features/vaccins/VaccinList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Welcome />} />
        {/* <Route index element={<Public />} />*/}

        
         {/* <Route path="login" element={<Login />} />*/}

        <Route path="dash" element={<DashLayout />} >

          <Route index element={<Welcome />} />

          <Route path="members">
            <Route index element={<MembersList />} />
          </Route>

          <Route path="diseases">
            <Route index element={<DiseaseList />} />
          </Route>

          <Route path="vaccins">
            <Route index element={<VaccinList />} />
          </Route>
        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}



export default App;