export interface CourseReview  {
    content: string;
    rating: string;
    created: string;
    user: {
        title: string;
        name: string;
        display_name: string;
    }
}

