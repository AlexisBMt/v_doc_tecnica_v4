import './styles.css'

export default function Spinner () {
  return (
    <section className='d-flex flex-row-reverse pe-5'>
      <div className='text-secondary fw-bold spinner-gear'><i className='bi bi-gear' style={{fontSize: '1.8rem'}}></i></div>
    </section>
  )
}