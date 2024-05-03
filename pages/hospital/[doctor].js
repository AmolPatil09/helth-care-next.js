import React, { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function doctor() {
  const router = useRouter();

  var [formData, setFormData] = useState({
    doctorName: router.query.doctor,
    date: "",
    time: "",
    petiontName: ""

  })
 
  var [formDataError, setFormDataError] = useState({
    dateError: "",
    timeError: "",
    petiontNameError: ""
  })

  var [formDataButton, setFormDataButton] = useState({
    dateButton: false,
    timeButton: false,
    petiontNameButton: false
  })
  var [message, setMesseges] = useState({
    errorMessage: "",
    successMessage: ""

  })

  const handleChange = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value }
    }, validate([e.target.name], [e.target.value]))

  }

  const validate = (name, value) => {
    if (name == "date") {
      if (value == "") {
        setFormDataError((pre) => {
          return { ...pre, dateError: "Please Select Appointment Date" }
        })
        setFormDataButton((pre) => {
          return { ...pre, dateButton: false }
        })
      }
      else if (new Date(value) <= new Date()) {
        setFormDataError((pre) => {
          return { ...pre, dateError: "Choose the future Date for Appointment" }
        })
        setFormDataButton((pre) => {
          return { ...pre, dateButton: false }
        })
      }
      else {
        setFormDataError((pre) => {
          return { ...pre, dateError: "" }
        })
        setFormDataButton((pre) => {
          return { ...pre, dateButton: true }
        })
      }
    }
    else if (name == "time") {
      if (value == "") {
        setFormDataError((pre) => {
          return { ...pre, timeError: "Please Select Time from Below" }
        })
        setFormDataButton((pre) => {
          return { ...pre, timeButton: false }
        })
      }

      else {
        setFormDataError((pre) => {
          return { ...pre, dateError: "" }
        })
        setFormDataButton((pre) => {
          return { ...pre, timeButton: true }
        })
      }
    }
    else if (name == "petiontName") {
      const namePattern = /[A-Za-z\s]+/
      if (value == "") {
        setFormDataError((pre) => {
          return { ...pre, petiontNameError: "Please Enter Petiont Name" }
        })
        setFormDataButton((pre) => {
          return { ...pre, petiontNameButton: false }
        })
      }
      else if (!(value.toString().match(namePattern))) {
        setFormDataError((pre) => {
          return { ...pre, petiontNameError: "Name content only alphabate" }
        })
        setFormDataButton((pre) => {
          return { ...pre, petiontNameButton: false }
        })
      }
      else {
        setFormDataError((pre) => {
          return { ...pre, petiontNameError: "" }
        })
        setFormDataButton((pre) => {
          return { ...pre, petiontNameButton: true }
        })
      }
    }
  }
  const submitData = () => {
    event.preventDefault()
    console.log(formData);
    axios.post('https://helthcaredata.onrender.com/Appointment', formData)
      .then(function (response) {
        setMesseges((pre) => {
          return { ...pre, successMessage: "Appointmet Book Successfull" }
        })
        { router.push("/home") }
      })
      .catch(function (error) {
        setMesseges((pre) => {
          return { ...pre, successMessage: "Server Not Respond" }

        })
        { router.push("/hospitals") }
      });
  }

  return (
    <div className='align-item-center' style={{ height: "550px" }}>

      <div className='bg-white mt-5' style={{ width: "350px", height: "auto", border: "2px solid black", borderRadius: "25px", margin: "auto" }}>
        <h2 className='text-center bg-black text-white' style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px", height: "50px" }} >Book Appointment</h2>
        <form className='container mb-3 mt-3' >
          <div>
            <label className='mt-3'>Doctor Name</label>
            <input
              className='form-control'
              value={router.query.doctor}
              name="doctorName"
              type="text"
            />

          </div>

          <div>
            <label class="form-label mt-3">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              class="form-control"
              value={formData.date}
              onChange={handleChange}

            />
            {formDataError.dateError && <div className='text-danger'>{formDataError.dateError}</div>}


          </div>

          <div>
            <label className=" mt-3 ">Time</label>
            <select className='form-control'
              name="time"
              value={formData.time}
              onChange={handleChange}>
              <option value="">--Select Time--</option>
              <option value="10 Am to 11 Am">10 Am to 11 Am</option>
              <option value="11 Am to 12 Pm">11 Am to 12 Pm</option>
              <option value="12 Pm to 01 Pm">12 Pm to 01 Pm</option>
              <option value="01 Pm to 02 Pm">01 Pm to 02 Pm</option>
              <option value="05 Pm to 06 Pm">05 Pm to 06 Pm</option>
              <option value="06 Pm to 07 Pm">06 Pm to 07 Pm</option>
              <option value="07 Pm to 08 Pm">07 Pm to 08 Pm</option>
              <option value="08 Pm to 09 Pm">08 Pm to 09 Pm</option>

            </select>
            {formDataError.timeError && <div className='text-danger'>{formDataError.timeError}</div>}


          </div>

          <div>
            <label class="form-label mt-3">Petiont Name</label>
            <input type="text"
              class="form-control"
              name="petiontName"
              onChange={handleChange}
              inputMode='numeric'
            />
            {formDataError.petiontNameError && <div className='text-danger'>{formDataError.petiontNameError}</div>}

          </div>
          <div>
            <button className='btn btn-success form-control mt-2'
              disabled={!(formDataButton.dateButton && formDataButton.timeButton && formDataButton.petiontNameButton)}
              onClick={submitData}>Book Appointment</button>
            {message.errorMessage && alert(message.errorMessage)}
            {message.successMessage && alert(message.successMessage)}
          </div>
        </form>
      </div>

    </div>
  )
}
