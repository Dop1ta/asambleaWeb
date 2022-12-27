import { useState, useEffect } from 'react'
import { Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import NavTab from '../components/NavTab'
import axios from 'axios'

const Asambleas = () => {

  const [asamblea, setAsambleas] = useState([])

  const getAsambleas = async () => {
    const response = await axios.get(`${process.env.API_URL}/getMeetings`)
    setAsambleas(response.data)
  }

  useEffect(() => {
    getAsambleas()
  }, [])

  const showAsambleas = () => {
    return asamblea.map(asambleas => {
      return (
        <Accordion allowToggle key={asambleas._id}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  {asambleas.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {asambleas.description}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )
    })
  }

  return (
    <Stack>
      <NavTab />
      {showAsambleas()}
    </Stack>
  )
}

export default Asambleas