/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TbFaceIdError } from 'react-icons/tb';
import { Dialog, DialogContent } from '../ui/dialog';
import Form from 'react-bootstrap/Form';
import { Button } from '../ui/button';
import { useAddTestimonoilMutation } from '@/slices/shippingApiSlice';
import { toast } from '../ui/use-toast';

function TestimoniolModel({ open, setOpen, refetch }) {
  const [addCustomeReview, { isLoading }] = useAddTestimonoilMutation();
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await addCustomeReview({
          comment,
          rating,
        });
        if (res.error) {
        
          setError(res.error.data.message);
        } else {
          refetch()
          setComment('');
          setRating(0);
          setOpen(false);
          toast({
            title: "Your review has been added",
            description: "Thank you so much for sharing your experience",
          });
        }
      } catch (error) {
        console.error("Error adding review:", error);
        setError("It looks like something went wrong!");
      }
    }
    setValidated(true);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:!w-[625px] lg:!w-full w-[95%] mx-auto bg-white">
        <h2 className="text-black font-semibold text-xl capitalize">
          Share with us your experience down below.
        </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Label className="font-bold text-black text-sm">
              Your opinion <span className="text-red-500">*</span>
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              disabled={isLoading}
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="placeholder:capitalize placeholder:text-base font-medium"
              placeholder="Type out your own experience with l'3chir"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="rating" className="my-2">
            <Form.Label className="font-bold text-black text-sm">
              Rating <span className="text-red-500">*</span>
            </Form.Label>
            <Form.Control
              disabled={isLoading}
              required
              as="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="">Select...</option>
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </Form.Control>
          </Form.Group>

          {error && (
            <div className="flex bg-red-400 p-2 rounded-[5px] mt-3 items-center gap-1">
              <TbFaceIdError />
              <p className="text-white text-base text-medium">{error}</p>
            </div>
          )}

          <Button
            disabled={isLoading}
            className="mt-3 bg-[#00afaa] text-white w-full"
            type="submit"
          >
            Submit form
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TestimoniolModel;
