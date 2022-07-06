import styled from 'styled-components'
import { colors } from "colors";
import Card from 'components/DashboardShared/CardLayout'
import AddButton from 'assets/images/add.svg'
// import EditButton from 'assets/images/edit.svg'
import { fonts } from 'fonts';
import ProfilePicture from 'assets/images/sampleProfilePic.jpg'
import { useState, useEffect } from 'react';
import DoctorsForm from 'components/HospitalDashboard/DoctorsForm'

import Axios from "axios";
import { useSelector } from "react-redux";


const Title = styled.div`
    font-size: 28px;
    font-weight: ${fonts.bold};
  `

const CardHeader = styled.div`
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const CardBody = styled.div`
`

const IconButton = styled.button`
    border-radius: 999px;
    background: ${colors.secondaryWhite};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid ${colors.secondaryWhite};
    width: 50px;
    height: 50px;
    display: grid;
    place-content: center;
  `
const Line = styled.div`
    margin: 30px 0;
    height: 1px;
    width: 100%;
    background: ${colors.primaryYellow};
  `

const Icons = styled.div``

const DoctorName = styled.div`
    font-size: 24px;
    font-weight: ${fonts.medium};
`

const DoctorSpeciality = styled.div`
    font-size: 18px;
    opacity: 0.8;
`


const DoctorContainer = styled.div`
    padding: 0 50px;
`

const DoctorProfilePicture = styled.div`
    border-radius: 999px;
`

const Doctor = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    font-size: 22px;
    opacity: 0.8;
`
const DoctorLeft = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`
const DoctorRight = styled.div``
const EventBody = styled.div``

const DoctorIntro = styled.div`
    display: flex;
    flex-direction: column;
`

const DoctorPhoneNumber = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
    gap: 10px;
`

const Index = () => {
    const [addDoctorOpen, setAddDoctorOpen] = useState(false);
    // const [editDoctorOpen, setEditDoctorOpen] = useState(false);

    const hospitalLogin = useSelector((state) => {
        return state.hospitalLogin;
      });

    let responseObject = { ...hospitalLogin.hospitalInfo };

    const [doctors, setDoctors] = useState([]);

    
  
    useEffect(()=>{
    
        Axios.get(`http://localhost:5000/api/hospitals/${responseObject._id}/allDoctors`).then((response) => {
            setDoctors(response.data);
        });
    },[])

    return (
        <Card>
            <CardHeader>
                <Title>
                    Doctors Information
                </Title>
                <Icons>
                    <IconButton onClick={(e) => setAddDoctorOpen(true)}>
                        <img src={AddButton} alt={"Add Button "} />
                    </IconButton>
                </Icons>
            </CardHeader>
            <Line />
            <CardBody>
                {doctors.map((doctor, index) => (
                    <>
                    <DoctorContainer>
                        <Doctor>
                            <DoctorLeft>
                                <DoctorProfilePicture>
                                    <img src={ProfilePicture} alt={"Profile "} />
                                </DoctorProfilePicture>
                                <DoctorIntro>
                                    <DoctorName>{doctor.name}</DoctorName>
                                    <DoctorSpeciality>{doctor.spec}</DoctorSpeciality>
                                </DoctorIntro>

                            </DoctorLeft>
                            <DoctorRight>
                                {/* <IconButton onClick={(e) => setEditDoctorOpen(true)}>
                                    <img src={EditButton} alt={"Edit Button "} />
                                </IconButton> */}
                            </DoctorRight>
                        </Doctor>
                        <EventBody>
                            Experience: {doctor.exp} years<br/>
                            email: {doctor.email}
                        </EventBody>
                        <DoctorPhoneNumber>
                            <span style={ {fontSize: "22px", color: "rgba(0, 0, 0, 0.8)"}}>Contact: </span>
                            <span style={{ fontSize: "22px", fontWeight: fonts.medium, color: "rgba(0, 0, 0, 0.8)" }}>92311155565</span>
                        </DoctorPhoneNumber>
                    </DoctorContainer>
                    {index < doctors.length - 1 && <Line />}
                </>
                ))}
            </CardBody>
            <DoctorsForm doctors={doctors} setDoctors={setDoctors} open={addDoctorOpen} setOpen={setAddDoctorOpen} type="add"/>
            {/* <DoctorsForm open={editDoctorOpen} setOpen={setEditDoctorOpen} type="edit"/> */}
        </Card>
    )
}

export default Index
