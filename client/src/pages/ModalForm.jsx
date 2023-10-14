import React, { useEffect } from 'react';
import Modal from 'react-modal';
import SignInModal from '../components/Modal/SignInModal';
import SignUpModal from '../components/Modal/SignUpModal';
import { useSelector, useDispatch } from 'react-redux';
import { showModalInfo, setModal } from '../features/modal/modalSlice';
import WelcomeModal from '../components/Modal/WelcomeModal';
import JobStatusModal from "../components/Modal/JobStatusModal"
import Password from '../components/Modal/PasswordModal';


const ModalForm = ({ isOpen, closeModal }) => {
    const modalInfo = useSelector(showModalInfo);
    console.log(modalInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isOpen]);

    let modalContent;
    switch (true) {
        case modalInfo.signInModal:
            modalContent = <SignInModal handleToggle={() => dispatch(setModal({ modalName: "signUpModal" }))} closeModal={closeModal} />;
            break;
        case modalInfo.signUpModal:
            modalContent = <SignUpModal handleToggle={() => dispatch(setModal({ modalName: "signInModal" }))} closeModal={closeModal} />;
            break;
        case modalInfo.welcomeModal:
            modalContent = <WelcomeModal />
            break;
        case modalInfo.jobStatusModal:
            modalContent = <JobStatusModal />
            break;
        case modalInfo.passwordModal:
            modalContent=<Password closeModal={closeModal} />
            break;
            default:
            modalContent = <div>No matching modal type</div>;
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className="fixed inset-0 flex items-center justify-center z-50 transform transition-opacity"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
            {modalContent}
        </Modal>
    );
};

export default ModalForm;
