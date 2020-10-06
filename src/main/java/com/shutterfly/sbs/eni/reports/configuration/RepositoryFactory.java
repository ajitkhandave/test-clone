package com.shutterfly.sbs.eni.reports.configuration;

import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;

public interface RepositoryFactory {

  ExtendedRepository getRepository(String name);

}
