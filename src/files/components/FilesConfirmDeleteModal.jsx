import { Divider, Form, Modal, message } from "antd";
import loadDirData from "../helpers/loadDirData";
import deleteFilesOrFolder from "../helpers/deleteFilesOrFolder";
import { useRouter } from "next/router";

const FilesConfirmDeleteModal = ({
  currentRecord,
  confirmDeleteModal,
  setConfirmDeleteModal,
  tableData,
  setTableData,
}) => {
  const router = useRouter();

  return (
    <>
      <Modal
        title="Confirm Delete File / Folder"
        open={confirmDeleteModal}
        onOk={async () => {
          const response = await deleteFilesOrFolder(currentRecord);

          setConfirmDeleteModal(false);
          setTableData(await loadDirData(router.query.p));
          
          if (!response.ok)
            message.error(`${response.status} Deleting File / Folder failed`);
          else message.success(`File / Folder successfully deleted`);
        
        }}
        
        onCancel={() => setConfirmDeleteModal(false)}
      >
        <Divider></Divider>
        <Form>
          <p>
            Are you user you want to delete{" "}
            <b>{currentRecord.info && currentRecord.info.name}</b>
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default FilesConfirmDeleteModal;
