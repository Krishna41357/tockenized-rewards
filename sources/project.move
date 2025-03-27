module MyModule::CourseRewards {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::account;

    struct Course has key, store {
        total_enrolled: u64,
        completion_reward: u64,
        course_creator: address
    }

    public entry fun create_course(
        course_creator: &signer, 
        completion_reward: u64
    ) {
        // Ensure the course creator can handle AptosCoin
        if (!coin::is_account_registered<AptosCoin>(signer::address_of(course_creator))) {
            coin::register<AptosCoin>(course_creator);
        };

        let course = Course {
            total_enrolled: 0,
            completion_reward,
            course_creator: signer::address_of(course_creator)
        };
        move_to(course_creator, course);
    }

    public entry fun claim_course_completion_reward(
        student: &signer, 
        course_creator: &signer
    ) acquires Course {
        // Ensure the student can handle AptosCoin
        if (!coin::is_account_registered<AptosCoin>(signer::address_of(student))) {
            coin::register<AptosCoin>(student);
        };

        let course_creator_addr = signer::address_of(course_creator);
        let course = borrow_global_mut<Course>(course_creator_addr);
        let amount = course.completion_reward;

        // Transfer coins
        coin::transfer<AptosCoin>(course_creator, signer::address_of(student), amount);

        // Update enrolled count
        course.total_enrolled = course.total_enrolled + 1;
    }

    public fun get_course_enrolled(course_creator: &signer): u64 acquires Course {
        let course_addr = signer::address_of(course_creator);
        let course = borrow_global<Course>(course_addr);
        course.total_enrolled
    }
}