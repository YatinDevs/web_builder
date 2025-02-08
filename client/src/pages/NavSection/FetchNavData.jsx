import { useEffect, useState } from "react";
import { Form, Input, Button, Steps, Space, Card } from "antd";
import useNavStore from "@/store/useNavStore";
import useWebsiteStore from "@/store/useWebsiteStore";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";

const { Step } = Steps;

const FetchNavSection = ({ selectedTemplate, subdomain_r, website_id }) => {
  const { websiteId, subdomain, fetchWebsiteDetails } = useWebsiteStore();
  const [navbarData, setNavbarData] = useState(null); // Store navbar data for live preview
  const [templateIss, setTemplateIss] = useState("");
  const { createNavSection, fetchNavSection } = useNavStore();
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    websiteId: website_id || "",
    subdomain: subdomain_r || "",
    templateId: selectedTemplate || "",
    titleUserName: "",
    caLogo: "",
    caContactNo1: "",
    caContactNo2: "",
    caEmailid: "",
    navItems: [{ label: "", link: "" }],
  });
  console.log(formData);

  // Fetch existing navbar data for preview when component mounts
  useEffect(() => {
    const fetchNavbarData = async () => {
      if (websiteId) {
        const data = await fetchNavSection(websiteId);
        setNavbarData(data);
      }
    };
    fetchNavbarData();
  }, [website_id]);

  const handleNext = async () => {
    try {
      const values = await form.validateFields(); // Validate current step
      setFormData((prev) => ({ ...prev, ...values })); // Merge with existing data
      setStep(step + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate last step
      const finalData = { ...formData, ...values }; // Merge with previous steps
      console.log("Final Form Data:", finalData);
      const res = await createNavSection(finalData);
      console.log(res.navSection);
      const updatedData = await fetchNavSection(res.navSection.website_id);
      const selectedTemplate = await fetchWebsiteDetails(
        res.navSection.website_id
      );
      console.log(selectedTemplate);
      setTemplateIss(selectedTemplate.template_id);
      setNavbarData(updatedData);
      setStep(0);
      form.resetFields();
      setFormData({
        titleUserName: "",
        caLogo: "",
        caContactNo1: "",
        caContactNo2: "",
        caEmailid: "",
        navItems: [{ label: "", link: "" }],
      });
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Card title="Add Data for Website" className="mt-10">
      <Steps current={step} className="mb-6">
        <Step title="Basic Info" />
        <Step title="Contact Info" />
        <Step title="Navigation" />
      </Steps>

      <Form form={form} initialValues={formData} layout="vertical">
        {step === 0 && (
          <>
            <Form.Item
              name="titleUserName"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item name="caLogo" label="Logo URL">
              <Input placeholder="Enter logo URL" />
            </Form.Item>
            <Button type="primary" onClick={handleNext} block>
              Next
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <Form.Item name="caContactNo1" label="Contact No 1">
              <Input placeholder="Enter contact number" />
            </Form.Item>
            <Form.Item name="caContactNo2" label="Contact No 2">
              <Input placeholder="Enter alternate contact number" />
            </Form.Item>
            <Form.Item
              name="caEmailid"
              label="Email ID"
              rules={[{ type: "email", message: "Enter a valid email" }]}
            >
              <Input placeholder="Enter email ID" />
            </Form.Item>
            <Space>
              <Button onClick={handlePrev}>Back</Button>
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            </Space>
          </>
        )}

        {step === 2 && (
          <>
            <Form.List name="navItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-2">
                      <Form.Item
                        {...restField}
                        name={[name, "label"]}
                        rules={[{ required: true, message: "Label required" }]}
                      >
                        <Input placeholder="Label" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "link"]}
                        rules={[{ required: true, message: "Link required" }]}
                      >
                        <Input placeholder="Link" />
                      </Form.Item>
                      <Button danger onClick={() => remove(name)}>
                        X
                      </Button>
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Navigation Item
                  </Button>
                </>
              )}
            </Form.List>
            <Space>
              <Button onClick={handlePrev}>Back</Button>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Space>
          </>
        )}
      </Form>
      {/* Live Preview Section */}

      <div className="mt-6 border shadow-2xs p-2 rounded-2xl">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        {navbarData && templateIss == "1" ? (
          <Template1 navbarData={navbarData} templateIss={templateIss} />
        ) : navbarData && templateIss == "2" ? (
          <Template2 navbarData={navbarData} templateIss={templateIss} />
        ) : (
          <p>No preview available. Please enter navigation details.</p>
        )}
      </div>
    </Card>
  );
};

export default FetchNavSection;
