import styled from 'styled-components'
import { colors } from "colors";
import Card from 'components/DashboardShared/CardLayout'
import AddButton from 'assets/images/add.svg'
// import EditButton from 'assets/images/edit.svg'
import { fonts } from 'fonts';
import { useState, useEffect } from 'react';
import ServiceForm from 'components/HospitalDashboard/ServiceForm'
import { useSelector } from "react-redux";
import Axios from "axios";

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

const ServiceName = styled.div`
    font-size: 24px;
    font-weight: ${fonts.medium};
`

const ServiceSpeciality = styled.div`
    font-size: 18px;
    opacity: 0.8;
`


const ServiceContainer = styled.div`
    padding: 0 50px;
`


const Service = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    font-size: 22px;
    opacity: 0.8;
`
const ServiceLeft = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`
const ServiceRight = styled.div``
const EventBody = styled.div``

const ServiceIntro = styled.div`
    display: flex;
    flex-direction: column;
`


const Index = () => {
    const [addServiceOpen, setAddServiceOpen] = useState(false);
    // const [editServiceOpen, setEditServiceOpen] = useState(false);

    const { hospitalInfo } = useSelector((state) => {
        return state.hospitalManipulation;
      });
    
      const [serviceCards, setServiceCards] = useState(hospitalInfo);
    
      const hospitalLogin = useSelector((state) => {
        return state.hospitalLogin;
      });
    
      let responseObject = { ...hospitalLogin.hospitalInfo };
    
    useEffect(()=>{
    
      Axios.post("http://localhost:5000/api/hospitals/hospitalServiceDetails",{id: responseObject._id}).then((response) => {
        setServiceCards(response.data);
      });
    },[])

    return (
        <Card>
            <CardHeader>
                <Title>
                    Service Information
                </Title>
                <Icons>
                    <IconButton onClick={(e) => setAddServiceOpen(true)}>
                        <img src={AddButton} alt={"Add Button "} />
                    </IconButton>
                </Icons>
            </CardHeader>
            <Line />
            <CardBody>
                {serviceCards.services.map((service, index) => (
                    <>
                        <ServiceContainer>

                            <Service>
                                <ServiceLeft>
                                    <ServiceIntro>
                                        <ServiceName>{service.topic}</ServiceName>
                                        <ServiceSpeciality>Service Charge: <span>(Rs. {service.serviceCharge})</span></ServiceSpeciality>
                                    </ServiceIntro>

                                </ServiceLeft>
                                <ServiceRight>
                                    {/* <IconButton onClick={(e) => setEditServiceOpen(true)}>
                                        <img src={EditButton} alt={"Edit Button "} />
                                    </IconButton> */}
                                </ServiceRight>
                            </Service>
                            <EventBody>
                            {service.desc}
                            </EventBody>
                        </ServiceContainer>
                        {index < serviceCards.services.length - 1 && <Line />}
                    </>
                ))}
            </CardBody>
            <ServiceForm serviceCards={serviceCards} setServiceCards={setServiceCards} open={addServiceOpen} setOpen={setAddServiceOpen} type="add" />
            {/* <ServiceForm open={editServiceOpen} setOpen={setEditServiceOpen} type="edit" /> */}
        </Card>
    )
}

export default Index
