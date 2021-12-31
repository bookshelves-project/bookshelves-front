const useForm = () => {
  const reset = (form: { [key: string]: any }) => {
    Object.entries(form).forEach(([key, value]) => {
      form[key] = ''
    })
  }

  return {
    reset
  }
}

export default useForm
