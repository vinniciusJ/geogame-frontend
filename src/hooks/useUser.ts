import { useRecoilState } from 'recoil'
import { user as userAtom } from '../context/'

const useUser = () => useRecoilState(userAtom)

export default useUser