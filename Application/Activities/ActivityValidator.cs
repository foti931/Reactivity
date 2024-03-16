using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Titleを入力してください。");
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}