import React, { useState } from "react";
import useJobs from "../hooks/useJobs";
import jobService, { Job } from "../services/job-service";
import { Table, Spinner } from "react-bootstrap";
import ModalJobs from "./ModalJobs";
import { omit } from "lodash";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Print } from "@mui/icons-material";
import jsPDF from "jspdf";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";

const employee = {
  name: "سعدي جيلاني",
  beginningDate: "2022-01-01",
  address: "حي أولاد ناصر",
};
// Import the Cairo font
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: `${window.location.origin}/src/assets/Cairo-Regular-BF643384ef31630.ttf`,
    },
  ],
});
// Create styles for the document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    
  },
  header: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'right',
  },
  arabicText: {
    fontFamily: 'Cairo', // You'll need to ensure an Arabic font is available
    fontSize: 14,
  //textAlign: 'right',
  },
  box: {
    border: '1px solid black',
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  signature: {
    flexDirection: "row",
    marginTop: 20,
    textAlign: 'center',
    display: "flex",
    
  },
});
//  <Text style={styles.arabicText}>السعدي الجيلاني</Text>
// Create Document Component
// Create the document component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Document Header */}
      <View style={styles.header}>
        <Text style={styles.arabicText}>
          الجمهورية الجزائرية الديمقراطية الشعبية {"\n"}
          وزارة التربية الوطنية {"\n"}
          مديرية التربية لولاية الجلفة {"\n"}
          مصلحة الموظفين والتفتيش
        </Text>
      </View>
      
      {/* Document Title */}
      <View style={styles.box}>
        <Text style={styles.arabicText}>محضر تنصيب</Text>
      </View>

      {/* Body Section */}
      <View style={styles.section}>
        <Text style={styles.arabicText}>
          يشهد مدير التربية لولاية الجلفة بأن:
        </Text>
        <Text style={styles.arabicText}>
          السيد/ السيدة: 
        </Text>
        <Text style={styles.arabicText}>
          قد نصب يوم:
        </Text>
        <Text style={styles.arabicText}>
          السيد/ة (ق): 
        </Text>
        <Text style={styles.arabicText}>
          مادة التدريس: 
        </Text>
        <Text style={styles.arabicText}>
          الوثيقة: 
        </Text>
        <Text style={styles.arabicText}>
          مكان العمل: مدرسة  بلدية: 
        </Text>
      </View>

      {/* Signatures Section */}
      <View style={styles.signature}>
        <Text style={[styles.arabicText, { flex: 1 }] }>
          مدير المؤسسة: 
        </Text>
        <Text style={[styles.arabicText, { flex: 1 }]}>
          مدير التربية: 
        </Text>
      </View>
    </Page>
  </Document>
);
// const generatePdf = () => {
//   const doc = new jsPDF();
//   doc.addFont(
//     "src/assets/Cairo-Regular-BF643384ef31630.ttf",
//     "Cairo",
//     "Regular"
//   );
//   doc.setFont("Cairo", "Regular");
//   // doc.setFontSize(24);
//   const arabicText = "بداية: ";
//   // const escapedText = unicodeEscape(arabicText);
//   doc.text("طباعة محضر تنصيب", 80, 10);
//   doc.text(arabicText, 10, 10);
//   doc.text(employee.beginningDate, 60, 10);

//   doc.text("Employee Name: ", 10, 20);
//   doc.text(employee.name, 60, 20);

//   doc.text("Address: ", 10, 30);
//   doc.text(employee.address, 60, 30);

//   doc.save("employee_report.pdf");
// };

const Jobs = () => {
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handlePrintClick = () => {
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
  };
  const { jobs, errorJob, isLoadingJob, setErrorJob, setJobs, setLoadingJob } =
    useJobs();

  if (isLoadingJob) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (errorJob) {
    return (
      <div className="text-center">
        <p>Error: {errorJob}</p>
      </div>
    );
  }

  const onAddJob = async (job: Job) => {
    const originalJobs = [...jobs];
    const newJob = omit(job, "id");
    jobService
      .create(newJob)
      .then(({ data: savedJob }) => setJobs([savedJob, ...jobs]))
      .catch((err) => {
        setErrorJob(err.message);
        setJobs(originalJobs);
      });
  };

  const onUpdateJob = async (job: Job) => {
    const originalJobs = [...jobs];
    const updatedJob = omit(job, "id");
    jobService
      .update(job.id, updatedJob)
      .then(({ data: updatedJob }) =>
        setJobs(
          jobs.map((j: { id: any }) =>
            j.id === updatedJob.id ? updatedJob : job
          )
        )
      )
      .catch((err) => {
        setErrorJob(err.message);
        setJobs(originalJobs);
      });
  };

  const onDeleteJob = async (job: Job) => {
    const originalJobs = [...jobs];
    setJobs(jobs.filter((p: { id: string }) => p.id !== job.id));
    jobService.delete(job.id).catch((err) => {
      setErrorJob(err.message);
      setJobs(originalJobs);
    });
  };
  const Dashboard = () => {
    return (
      <div className="card mb-3">
        <h1 className="card-title text-center "> المنصب</h1>
        <div className="card-body">
          <div className="row  justify-content-center  ">
            <div className="col-sm-auto ">
              <div className="card w-100 h-100">
                <button
                  className="btn btn-outline-info w-100 h-100"
                  onClick={handlePrintClick}
                >
                  <Print />
                  طباعة محضر تنصيب
                </button>

                <Modal show={showPdfModal} onHide={handleClosePdfModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>PDF Viewer</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ height: "80vh", overflowY: "auto" }}>
                    <PDFViewer style={{ width: "100%", height: "100%" }}>
                      <MyDocument />
                    </PDFViewer>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            <div className="col-sm-auto ">
              <div className="card w-100 h-100">
                <button className="btn btn-outline-info w-100 h-100">
                  <Print />
                  طباعة محضر تعيين
                </button>
              </div>
            </div>

            <div className="col-sm-auto ">
              <div className="card w-100 h-100 ">
                <div className="card w-100 h-100 ">
                  {/* <h4 className="card-title  ">إضافة موظف جديد</h4> */}
                  <ModalJobs
                    onCreate={(employee: Job) => onAddJob(employee)}
                    buttonName="إضافة منصب جديد +"
                    heading="إضافة منصب جديد"
                    department_id={""}
                    employee_id=""
                    title={""}
                    buttonColor=" btn-success w-100 h-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-auto ">
              <div className="card ">
                <h4 className="card-title  ">عدد المناصب</h4>
                <p className="card-text text-center text-sm ">{jobs.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="column justify-content-center ">
        <div className="col-sm-auto mx-auto">
          <Dashboard />
        </div>
        <div className="col-sm-auto mx-auto">
          <table
            dir="rtl"
            className="table  table-hover align-middle "
            style={{ tableLayout: "auto", height: "5%" }}
          >
            <caption
              className="text-center"
              style={{
                captionSide: "top",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              قائمة المناصب
            </caption>
            <thead>
              <tr>
                <th className="text-center fit-content" scope="col">
                  اسم المنصب
                </th>
                <th className="text-center fit-content" scope="col">
                  الموظف
                </th>
                <th className="text-center" scope="col">
                  المصلحة
                </th>

                <th className="text-center" scope="col">
                  تعديل
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job: Job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>
                    {job.employee_first_name} {job.employee_last_name}
                  </td>

                  <td>{job.department_name}</td>
                  <td>
                    <ModalJobs
                      onCreate={(j: Job) => onAddJob(j)}
                      buttonName="تعديل"
                      heading="تعديل موظف "
                      department_id={""}
                      employee_id=""
                      title={""}
                      buttonColor=" btn-outline-secondary "
                    />

                    <button
                      onClick={() => onDeleteJob(job)}
                      className="btn btn-outline-danger"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
function unicodeEscape(arabicText: string) {
  throw new Error("Function not implemented.");
}
