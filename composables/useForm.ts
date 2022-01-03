const useForm = () => {
  const reset = (form: { [key: string]: any }) => {
    for (const key in form) {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    }

    return form as any
  }

  return {
    reset
  }
}

export default useForm
