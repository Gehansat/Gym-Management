// import React, { Component, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   FormGroup,
//   Input,
//   Dropdown,
//   DropdownItem,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Table,
// } from "reactstrap";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { API_URL } from "../../constant/api-config.js";

// const Allmembers = () => {
//   //Variables to store data
//   const [First_Name, setFirst_Name] = useState("");
//   const [Last_Name, setLast_Name] = useState("");
//   const [NIC, setNIC] = useState("");
//   const [Address, setAddress] = useState("");
//   const [Contact, setContact] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Designation, setDesignation] = useState("Associate Manager");
//   const [AddModal, setAddModal] = useState(false);
//   const [TableData, setTableData] = useState("");

//   //Variable to store Data to Update
//   const [UFirst_Name, setUFirst_Name] = useState("");
//   const [ULast_Name, setULast_Name] = useState("");
//   const [UNIC, setUNIC] = useState("");
//   const [UAddress, setUAddress] = useState("");
//   const [UContact, setUContact] = useState("");
//   const [UEmail, setUEmail] = useState("");
//   const [UDesignation, setUDesignation] = useState("Associate Manager");
//   const [UpdateModal, setUpdateModal] = useState(false);
//   const [UpdateItem, setUpdateItem] = useState("");
//   //Variable For Search Keyword
//   const [Keyword, setKeyword] = useState("");

//   //Variable to store Manager count
//   const [EmpCount, setEmpCount] = useState(0);
//   const [StockCount, setStockCount] = useState(0);
//   const [SupplierCount, setSupplierCount] = useState(0);
//   const [PurchasingCount, setPurchasingCount] = useState(0);
//   const [FinanceCount, setFinanceCount] = useState(0);
//   const [DeliveryCount, setDeliveryCount] = useState(0);

//   //Add Modal Open/Close
//   const addToggle = () => {
//     setAddModal(!AddModal);
//   };
//   //Update Modal Open/Close
//   const updateToggle = (item) => {
//     setUpdateModal(!UpdateModal);
//     if (item) {
//       setUpdateItem(item._id);
//       setUAddress(item.Address);
//       setUContact(item.Contact);
//       setUDesignation(item.Designation);
//       setUFirst_Name(item.First_name);
//       setULast_Name(item.Last_name);
//       setUNIC(item.NIC);
//       setUEmail(item.Email);
//     }
//   };

//   //Create Record Function
//   const createRecord = () => {
//     if (First_Name == null || First_Name == "" || First_Name == undefined) {
//       toast.error("Please Enter First Name !!");
//     } else if (Last_Name == null || Last_Name == "" || Last_Name == undefined) {
//       toast.error("Please Enter Last Name !!");
//     } else if (NIC == null || NIC == "" || NIC == undefined) {
//       toast.error("Please Enter NIC Number  !!");
//     } else if (Address == null || Address == "" || Address == undefined) {
//       toast.error("Please Enter Address  !!");
//     } else if (Contact == null || Contact == "" || Contact == undefined) {
//       toast.error("Please Enter Contact Number  !!");
//     } else if (
//       Designation == null ||
//       Designation == "" ||
//       Designation == undefined
//     ) {
//       toast.error("Please Select Designation !!");
//     } else {
//       const model = {
//         First_name: First_Name,
//         Last_name: Last_Name,
//         NIC: NIC,
//         Address: Address,
//         Contact: Contact,
//         Email: Email,
//         Designation: Designation,
//       };
//       axios
//         .post(API_URL + "/add", model)
//         .then((response) => {
//           console.log("Response", response);
//           if (response.status == 200) {
//             toast.success("Successfully Created Record !!");
//             setTableData("");
//             getData();
//           }
//         })
//         .catch((error) => {
//           toast.error("Error While Creating Record !!");
//         });
//     }
//   };
//   //Get Count of Each Manager
// const getCount=(data)=>{
//   const st=data.filter((item=>item.Designation=="Stock Manager"))
//   setStockCount(st.length)
//   const emp=data.filter((item=>item.Designation=="Employee Manager"))
//   setEmpCount(emp.length)
//   const sup=data.filter((item=>item.Designation=="Supplier Manager"))
//   setSupplierCount(sup.length)
//   const pu=data.filter((item=>item.Designation=="Purchasing Manager"))
//   setPurchasingCount(pu.length)
//   const fi=data.filter((item=>item.Designation=="Finance Manager"))
//   setFinanceCount(fi.length)
//   const del=data.filter((item=>item.Designation=="Delivery Manager"))
//   setDeliveryCount(del.length)


// }
//   //Get All Data from Backend
//   const getData = () => {
//     axios
//       .get(API_URL + "/")
//       .then((response) => {
//         console.log(response);
//         setTableData(response.data);
//         getCount(response.data)
        
//       })
//       .catch((error) => {
//         toast.error("Error While Fetching Data !!.");
//       });
      
//   };
//   //Delete Record
//   const deleteRecord = (id) => {
//     axios
//       .delete(API_URL + "/delete/" + id)
//       .then((response) => {
//         if (response.status == 200) {
//           toast.success("Successfully Deleted Data !!");
//           setTableData("");
//           getData();
//         }
//       })
//       .catch((error) => {
//         toast.error("Error While Deleting Data !!!");
//       });
//   };
//   //update Record
//   const updateRecord = () => {
//     if (UFirst_Name == null || UFirst_Name == "" || UFirst_Name == undefined) {
//       toast.error("Please Enter First Name !!");
//     } else if (
//       ULast_Name == null ||
//       ULast_Name == "" ||
//       ULast_Name == undefined
//     ) {
//       toast.error("Please Enter Last Name !!");
//     } else if (UNIC == null || UNIC == "" || UNIC == undefined) {
//       toast.error("Please Enter NIC Number  !!");
//     } else if (UAddress == null || UAddress == "" || UAddress == undefined) {
//       toast.error("Please Enter Address  !!");
//     } else if (UContact == null || UContact == "" || UContact == undefined) {
//       toast.error("Please Enter Contact Number  !!");
//     } else if (
//       UDesignation == null ||
//       UDesignation == "" ||
//       UDesignation == undefined
//     ) {
//       toast.error("Please Select Designation !!");
//     } else {
//       const modal = {
//         First_name: UFirst_Name,
//         Last_name: ULast_Name,
//         NIC: UNIC,
//         Address: UAddress,
//         Contact: UContact,
//         Email: UEmail,
//         Designation: UDesignation,
//       };
//       axios.put(API_URL + "/update/" + UpdateItem, modal).then((response) => {
//         if (response.status == 200) {
//           toast.success("Successfully Updated Data !!");
//           getData();
//           updateToggle(!UpdateModal);
//         }
//       });
//     }
//   };
//   //Search Data
//   const searchData = () => {
//     axios
//       .get(API_URL + "/get/" + Keyword)
//       .then((response) => {
//         console.log(response);
//         setTableData(response.data);
//       })
//       .catch((error) => {});
//   };
//   //Form Load event
//   useEffect(() => {
//     if (TableData == "") {
//       getData();
//     }
//     if (TableData != "") {
//     }
//   }, []);

//   const savePDF = async () => {
//     const doc = new jsPDF("p", "pt", "a4");

//     doc.setFontSize(15);
//     doc.text("All Report", 40, 40);
//     var data
//     var price = 0
//     var count = 0

//     await axios
//       .get(API_URL + "/")
//       .then(res => {
//         if (res.data) {
         
      
//           console.log(res.data)
//           data = res.data 
//           const headers = [["ID", "First Name", "Last Name", "Designation", "Email","NIC","Contact","Address"]];
//           const datas = res.data.map(elt => [++count, elt.First_name, elt.Last_name, elt.Designation, elt.Email,elt.NIC,elt.Contact,elt.Address]);
//           let content = {
//             startY: 50,
//             head: headers,
//             body: datas
//           };

//           data.map(res => {
//             price = price + res.cost
//           });


//           doc.autoTable(content)
//         } else {
//           //  sweat("ERROR!", "NIC ERROR!", "error")
//         }
//       })
//     // doc.text("Total Price = Rs. " + price + " /-", 40, 800)
//     // doc.text("Total  = " + count, 400, 800)
//     doc.save("report.pdf")
//   };
//   return (
//     <div>
//       <h4 className='head-title' style={{textAlign:"center"}}> Dashboard Management </h4>
//       <hr/>
//       <br></br>
//       <br></br>
//       <div className="row">
//         <div className="col-md-4">
//           <Input
//             style={{ marginLeft: 20 }}
//             onChange={(e) => {
//               setKeyword(e.target.value);
//             }}
//             type="text"
//             placeholder="Search by First Name"
//           />
//         </div>
//         <div className="col-md-4">
//           <Button
//             onClick={() => {
//               searchData();
//             }}
//           >
//             Search
//           </Button>
//         </div>
//         <div className="col-md-2"><Button  onClick={()=>{savePDF()}}>Download Report</Button></div>
//         <div className="col-md-2">
//           <Button color="success" onClick={() => addToggle()}>
//             {" "}
//             + Add Record
//           </Button>
//         </div>
//       </div>
//       <br></br>
//       <br></br>
//       <br></br>
//       <Table>
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>Record No</th>
//             <th style={{ textAlign: "center" }}>First Name</th>
//             <th style={{ textAlign: "center" }}>Last Name</th>
//             <th style={{ textAlign: "center" }}>Designation</th>
//             <th style={{ textAlign: "center" }}>Email</th>
//             <th style={{ textAlign: "center" }}>NIC</th>
//             <th style={{ textAlign: "center" }}>Contact</th>
//             <th style={{ textAlign: "center" }}>Address</th>
//             <th style={{ textAlign: "center" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {TableData &&
//             TableData.map((item, index) => {
//               return (
//                 <tr>
//                   <td style={{ textAlign: "center" }}>{index + 1}</td>
//                   <td style={{ textAlign: "center" }}>{item.First_name}</td>
//                   <td style={{ textAlign: "center" }}>{item.Last_name}</td>
//                   <td style={{ textAlign: "center" }}>{item.Designation}</td>
//                   <td style={{ textAlign: "center" }}>{item.Email}</td>
//                   <td style={{ textAlign: "center" }}>{item.NIC}</td>
//                   <td style={{ textAlign: "center" }}>{item.Contact}</td>
//                   <td style={{ textAlign: "center" }}>{item.Address}</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Button
//                       color="primary"
//                       onClick={() => {
//                         updateToggle(item);
//                       }}
//                     >
//                       <i class="bi bi-pencil"></i>
//                     </Button>
//                     &nbsp;
//                     <Button
//                       color="danger"
//                       onClick={() => {
//                         deleteRecord(item._id);
//                       }}
//                     >
//                       <i class="bi bi-trash3"></i>
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </Table>
//       <br></br>
//       <h2 style={{ textAlign: "center" }}>Manager Count</h2>
//       <br></br>
//       <Table>
//         <thead>
//           <th style={{ textAlign: "center" }}>Employee Manager Count</th>
//           <th style={{ textAlign: "center" }}>Stock Manager Count</th>
//           <th style={{ textAlign: "center" }}>Supplier Manager Count</th>
//           <th style={{ textAlign: "center" }}>Purchasing Manager Count</th>
//           <th style={{ textAlign: "center" }}>Finance Manager Count</th>
//           <th style={{ textAlign: "center" }}>Delivery Manager Count</th>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={{ textAlign: "center" }}>{EmpCount}</td>
//             <td style={{ textAlign: "center" }}>{StockCount}</td>
//             <td style={{ textAlign: "center" }}>{SupplierCount}</td>
//             <td style={{ textAlign: "center" }}>{PurchasingCount}</td>
//             <td style={{ textAlign: "center" }}>{FinanceCount}</td>
//             <td style={{ textAlign: "center" }}>{DeliveryCount}</td>
//           </tr>
//         </tbody>
//       </Table>
//       {/* <div className="row" style={{marginLeft:25}}>
//       Employee Manager Count: {EmpCount}
//       </div>
//       <div className="row" style={{marginLeft:25}}>
//       Stock Manager Count : {StockCount}
//       </div>
//       <div className="row" style={{marginLeft:25}}>
//       Supplier Manager Count : {SupplierCount}
//       </div>
//       <div className="row" style={{marginLeft:25}}>
//       Purchasing Manager Count : {PurchasingCount}
//       </div>
//       <div className="row" style={{marginLeft:25}}>
//       Finance Manager Count : {FinanceCount}
//       </div>
//       <div className="row" style={{marginLeft:25}}>
//       Delivery Manager Count : {DeliveryCount}
//       </div> */}

//       {/* Update Item Modal Start */}
//       <Modal isOpen={UpdateModal}>
//         <ModalHeader>
//           <div className="row">
//             <div className="col-md-8"></div>
//             <div className="col-md-4">
//               <a
//                 onClick={() => {
//                   updateToggle();
//                 }}
//               >
//                 x
//               </a>
//             </div>
//           </div>
//         </ModalHeader>
//         <ModalBody style={{ padding: "25px" }}>
//           <div className="row">
//             {/* <div className="col-md-3"></div>
//         <div className="col-md-6"> */}
//             <Card>
//               <CardHeader>Update Employee</CardHeader>
//               <CardBody>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>First Name</label>
//                       <Input
//                         type="text"
//                         placeholder="First Name"
//                         value={UFirst_Name}
//                         onChange={(e) => {
//                           setUFirst_Name(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Last Name</label>
//                       <Input
//                         type="text"
//                         placeholder="Last Name"
//                         value={ULast_Name}
//                         onChange={(e) => {
//                           setULast_Name(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>NIC</label>
//                       <Input
//                         type="text"
//                         placeholder="NIC"
//                         value={UNIC}
//                         onChange={(e) => {
//                           setUNIC(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Address</label>
//                       <Input
//                         type="text"
//                         placeholder="Address"
//                         value={UAddress}
//                         onChange={(e) => {
//                           setUAddress(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Contact</label>
//                       <Input
//                         type="text"
//                         placeholder="Contact"
//                         value={UContact}
//                         onChange={(e) => {
//                           setUContact(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Email</label>
//                       <Input
//                         type="email"
//                         placeholder="Email"
//                         value={UEmail}
//                         onChange={(e) => {
//                           setUEmail(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-12">
//                     <FormGroup>
//                       <label>Designation</label>
//                       <select
//                       value={UDesignation}
//                         onChange={(e) => {
//                           setUDesignation(e.target.value);
//                         }}
//                         className="form-control"
//                       >
//                         <option value={"Employee Manager"}>
//                           Employee Manager
//                         </option>
//                         <option value={"Stock Manager"}>Stock Manager</option>
//                         <option value={"Supplier Manager"}>
//                           Supplier Manager
//                         </option>
//                         <option value={"Purchasing Manager"}>
//                           Purchasing Manager
//                         </option>
//                         <option value={"Finance Manager"}>
//                           Finance Manager
//                         </option>
//                         <option value={"Delivery Manager"}>
//                           Delivery Manager
//                         </option>
//                       </select>
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <br></br>
//                 <div className="row">
//                   <div className="col-md-3"></div>
//                   <div className="col-md-6">
//                     <div className="row">
//                       <div className="col-md-1"></div>
//                       <div className="col-md-10">
//                         <Button
//                           color="success"
//                           onClick={() => {
//                             updateRecord();
//                           }}
//                         >
//                           Update Record
//                         </Button>
//                       </div>
//                       <div className="col-md-1"></div>
//                     </div>
//                   </div>
//                   <div className="col-md-3"></div>
//                 </div>
//               </CardBody>
//             </Card>
//             {/* </div>
//         <div className="col-md-3"></div> */}
//           </div>
//         </ModalBody>
//       </Modal>
//       {/* Add New Item Modal Start */}
//       <Modal isOpen={AddModal}>
//         <ModalHeader>
//           <div className="row">
//             <div className="col-md-8"></div>
//             <div className="col-md-4">
//               <a
//                 onClick={() => {
//                   addToggle();
//                 }}
//               >
//                 x
//               </a>
//             </div>
//           </div>
//         </ModalHeader>
//         <ModalBody style={{ padding: "25px" }}>
//           <div className="row">
//             {/* <div className="col-md-3"></div>
//         <div className="col-md-6"> */}
//             <Card>
//               <CardHeader>Add Employee</CardHeader>
//               <CardBody>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>First Name</label>
//                       <Input
//                         type="text"
//                         placeholder="First Name"
//                         value={First_Name}
//                         onChange={(e) => {
//                           setFirst_Name(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Last Name</label>
//                       <Input
//                         type="text"
//                         placeholder="Last Name"
//                         value={Last_Name}
//                         onChange={(e) => {
//                           setLast_Name(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>NIC</label>
//                       <Input
//                         type="text"
//                         placeholder="NIC"
//                         value={NIC}
//                         onChange={(e) => {
//                           setNIC(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Address</label>
//                       <Input
//                         type="text"
//                         placeholder="Address"
//                         value={Address}
//                         onChange={(e) => {
//                           setAddress(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Contact</label>
//                       <Input
//                         type="text"
//                         placeholder="Contact"
//                         value={Contact}
//                         onChange={(e) => {
//                           setContact(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-6">
//                     <FormGroup>
//                       <label>Email</label>
//                       <Input
//                         type="email"
//                         placeholder="Email"
//                         value={Email}
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                         }}
//                       />
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-12">
//                     <FormGroup>
//                       <label>Designation</label>
//                       <select
//                         onChange={(e) => {
//                           setDesignation(e.target.value);
//                         }}
//                         className="form-control"
//                       >
//                         <option value={"Employee Manager"}>
//                           Employee Manager
//                         </option>
//                         <option value={"Stock Manager"}>Stock Manager</option>
//                         <option value={"Supplier Manager"}>
//                           Supplier Manager
//                         </option>
//                         <option value={"Purchasing Manager"}>
//                           Purchasing Manager
//                         </option>
//                         <option value={"Finance Manager"}>
//                           Finance Manager
//                         </option>
//                         <option value={"Delivery Manager"}>
//                           Delivery Manager
//                         </option>
//                       </select>
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <br></br>
//                 <div className="row">
//                   <div className="col-md-3"></div>
//                   <div className="col-md-6">
//                     <div className="row">
//                       <div className="col-md-1"></div>
//                       <div className="col-md-10">
//                         <Button
//                           color="success"
//                           onClick={() => {
//                             createRecord();
//                           }}
//                         >
//                           Create Record
//                         </Button>
//                       </div>
//                       <div className="col-md-1"></div>
//                     </div>
//                   </div>
//                   <div className="col-md-3"></div>
//                 </div>
//               </CardBody>
//             </Card>
//             {/* </div>
//         <div className="col-md-3"></div> */}
//           </div>
//         </ModalBody>
//       </Modal>
//       {/* Add New Item Modal End */}
//       <br></br>
//     </div>
//   );
// };
// export default Allmembers;
