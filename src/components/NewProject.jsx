import { useRef } from 'react';
import Input from './Input'
import ErrorModal from './ErrorModal';


export default function NewProject({ onAdd, onCancel }) {

    const modal = useRef();

    const titleRef = useRef();
    const desRef = useRef();
    const dueDateRef = useRef();


    function handleSave() {
        const enterdTitle = titleRef.current.value;
        const enterdDescription = desRef.current.value;
        const enterdDueDate = dueDateRef.current.value;

        // validation ... 
        if (enterdTitle.trim() === '' || enterdDescription.trim() === '' || enterdDueDate.trim() === '') {
            modal.current.open();

            return;
        }

        onAdd({
            title: enterdTitle,
            description: enterdDescription,
            dueDate: enterdDueDate,
        })
    }

    return (
        <>
            <ErrorModal ref={modal} buttonCaption="Close">
                <h2 className='text-xl font-bold text-stone-700 my-4' >Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Oops... looks like you forgot to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
            </ErrorModal>
            <div className='w-[35rem] mt-16 '>
                <menu className='flex items-center justify-end gap-4 my-4'>
                    <li><button className='text-stone-800 hover:text-stone-950'
                        onClick={onCancel}>
                        Cancel</button></li>
                    <li><button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
                        onClick={handleSave}>
                        Save
                    </button></li>
                </menu>
                <div>
                    <Input ref={titleRef} label="Title" />
                    <Input ref={desRef} label="Description" textarea={true} />
                    <Input ref={dueDateRef} type='date' label="Due Date" />
                </div>
            </div>

        </>
    )
}