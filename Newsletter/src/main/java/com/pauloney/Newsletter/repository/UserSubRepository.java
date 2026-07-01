package com.pauloney.Newsletter.repository;

import com.pauloney.Newsletter.model.UserSub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSubRepository extends JpaRepository<UserSub, Long> {
}
