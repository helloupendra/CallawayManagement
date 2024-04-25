import React from 'react'
import ManagerList from './ManagerLists'

const Manager = () => {
  return (
    <div>
      <div className="toolbar py-5 mt-12 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3"> Manager</h1>
          </div>

          <div className="d-flex align-items-center py-1">
            <ol className="breadcrumb text-muted fs-6 fw-bold">
              <li className="breadcrumb-item pe-3 ">
                <a href="#" className="pe-3 text-white">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item pe-3">
                <a href="#" className="pe-3 text-white">
                  Accounts
                </a>
              </li>
              <li className="breadcrumb-item px-3" style={{color:"#ddd"}}>Manager</li>
            </ol>
          </div>

        </div>
      </div>

      <ManagerList />

    </div>
  )
}

export default Manager
